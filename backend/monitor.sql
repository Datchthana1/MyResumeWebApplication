-- ===========================================================================
-- Supabase RPC for the Air Station Monitor
-- Run this ONCE in the Supabase SQL Editor.
--
-- SOURCE: the PER-STATION tables (station_*) produced by PL1 (transform_station)
--   — NOT the dim/fact mart and NOT the raw air_stations bucket.
--   Data flow:  air_stations (raw) -> PL1 -> station_* (one table per station)
--   Each station_* table holds one station's transformed history; this function
--   dynamically unions the most-recent row from every station_* table, so the
--   monitor reflects PL1's per-station output directly.
--
-- It returns one row per station table (the "expected" set), each carrying its
-- most-recent metadata plus a `reported` flag = true when that station's latest
-- row belongs to the newest ingestion snapshot (created_at = MAX(created_at)
-- across all stations).
--
-- recorded_at / created_at are fixed-format text ("YYYY-MM-DD HH:MM:SS"), so
-- lexicographic ordering/comparison is equivalent to chronological ordering.
-- Output columns are unchanged, so the API/frontend contract stays the same.
-- ===========================================================================

create or replace function get_station_monitor()
returns table (
  station_id       text,
  area_th          text,
  area_en          text,
  station_type     text,
  lat              float,
  lon              float,
  last_recorded_at text,
  last_created_at  text,
  last_aqi         text,
  reported         boolean
)
language plpgsql
stable
as $$
declare
  v_tbl   text;
  v_parts text[] := '{}';
  v_sql   text;
begin
  -- Build one SELECT per station_* table: its single most-recent row.
  for v_tbl in
    select tablename
    from pg_tables
    where schemaname = 'public'
      and tablename like 'station\_%'
    order by tablename
  loop
    v_parts := v_parts || format(
      '(select station_id, area_th, area_en, station_type, lat, lon,
               recorded_at, created_at, aqi::text as aqi
        from %I order by created_at desc nulls last limit 1)',
      v_tbl
    );
  end loop;

  -- No per-station tables yet -> empty result.
  if array_length(v_parts, 1) is null then
    return;
  end if;

  v_sql := array_to_string(v_parts, ' union all ');

  return query execute format($f$
    with per_station as ( %s ),
    latest as ( select max(created_at) as max_created from per_station )
    select
      p.station_id,
      p.area_th,
      p.area_en,
      p.station_type,
      p.lat,
      p.lon,
      p.recorded_at as last_recorded_at,
      p.created_at  as last_created_at,
      p.aqi         as last_aqi,
      (p.created_at = (select max_created from latest)) as reported
    from per_station p
    -- missing/stale stations first, then alphabetical
    order by reported asc, p.station_id asc
  $f$, v_sql);
end;
$$;

-- Allow the API (anon / service role) to call it.
grant execute on function get_station_monitor() to anon, authenticated, service_role;

-- ===========================================================================
-- Supabase RPC for the Air Station Monitor
-- Run this ONCE in the Supabase SQL Editor (project that holds `air_stations`).
--
-- It returns one row per DISTINCT station_id (the "expected" set), each carrying
-- its most-recent metadata plus a `reported` flag = true when that station is
-- present in the latest ingestion snapshot (created_at = MAX(created_at)).
--
-- The created_at column is a fixed-format text timestamp ("YYYY-MM-DD HH:MM:SS"),
-- so lexicographic ordering/comparison is equivalent to chronological ordering.
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
language sql
stable
as $$
  with latest as (
    select max(created_at) as max_created from air_stations
  ),
  per_station as (
    select distinct on (station_id)
      station_id,
      area_th,
      area_en,
      station_type,
      lat,
      lon,
      recorded_at as last_recorded_at,
      created_at  as last_created_at,
      aqi::text   as last_aqi
    from air_stations
    order by station_id, created_at desc
  )
  select
    p.station_id,
    p.area_th,
    p.area_en,
    p.station_type,
    p.lat,
    p.lon,
    p.last_recorded_at,
    p.last_created_at,
    p.last_aqi,
    (p.last_created_at = (select max_created from latest)) as reported
  from per_station p
  -- missing stations first, then alphabetical
  order by reported asc, p.station_id asc;
$$;

-- Allow the API (anon / service role) to call it.
grant execute on function get_station_monitor() to anon, authenticated, service_role;

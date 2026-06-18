-- ===========================================================================
-- Supabase RPC for the Air Station Monitor
-- Run this ONCE in the Supabase SQL Editor (project that holds the mart).
--
-- Source is the STAR-SCHEMA MART built by the pipeline's PL2
-- (dim_station + fact_air_quality), NOT the raw `air_stations` bucket.
-- Data flow:  air_stations (raw) -> PL1 -> station_* -> PL2 -> dim/fact -> here.
--
-- It returns one row per station in dim_station (the "expected" set), each
-- carrying its most-recent fact row plus a `reported` flag = true when that
-- station's latest fact belongs to the latest ingestion snapshot
-- (created_at = MAX(created_at) across the fact).
--
-- last_recorded_at / last_created_at are formatted back to "YYYY-MM-DD HH:MM:SS"
-- so the API's strptime parsing keeps working unchanged.
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
    select max(created_at) as max_created from fact_air_quality
  ),
  per_station as (
    -- newest fact per station (dim_station = the expected set of stations)
    select distinct on (f.station_key)
      d.station_id,
      d.area_th,
      d.area_en,
      d.station_type,
      d.lat,
      d.lon,
      f.recorded_at as last_recorded_at,
      f.created_at  as last_created_at,
      f.aqi         as last_aqi
    from fact_air_quality f
    join dim_station d on d.station_key = f.station_key
    order by f.station_key, f.created_at desc nulls last
  )
  select
    p.station_id,
    p.area_th,
    p.area_en,
    p.station_type,
    p.lat,
    p.lon,
    to_char(p.last_recorded_at, 'YYYY-MM-DD HH24:MI:SS') as last_recorded_at,
    to_char(p.last_created_at,  'YYYY-MM-DD HH24:MI:SS') as last_created_at,
    p.last_aqi::text                                     as last_aqi,
    (p.last_created_at = (select max_created from latest)) as reported
  from per_station p
  -- missing stations first, then alphabetical
  order by reported asc, p.station_id asc;
$$;

-- Allow the API (anon / service role) to call it.
grant execute on function get_station_monitor() to anon, authenticated, service_role;

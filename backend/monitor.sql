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
  order by reported asc, p.station_id asc;
$$;

grant execute on function get_station_monitor() to anon, authenticated, service_role;

-- ===========================================================================
-- Supabase RPC: per-station history, aggregated by hour / day / month.
-- Run this ONCE in the Supabase SQL Editor (same project as the mart),
-- in addition to monitor.sql.
--
-- Source is the STAR-SCHEMA MART built by the pipeline's PL2
-- (fact_air_quality joined to dim_station), NOT the raw `air_stations` bucket.
-- recorded_at is already a real `timestamp` in the fact. air4thai's "no reading"
-- sentinel (-1) is nulled before averaging; OpenWeather (ow_*) fields can be
-- legitimately negative (temperature) so they are averaged as-is.
-- ===========================================================================

create or replace function get_station_history(
  p_station_id text,
  p_granularity text default 'day',
  p_limit int default 7
)
returns table (
  bucket        text,
  -- Air4Thai
  aqi           numeric,
  pm25          numeric,
  pm10          numeric,
  co            numeric,
  o3            numeric,
  no2           numeric,
  so2           numeric,
  -- OpenWeather
  ow_aqi        numeric,
  ow_pm25       numeric,
  ow_pm10       numeric,
  ow_o3         numeric,
  ow_no2        numeric,
  ow_so2        numeric,
  ow_co         numeric,
  ow_nh3        numeric,
  ow_temp       numeric,
  ow_feels_like numeric,
  ow_humidity   numeric,
  ow_pressure   numeric,
  ow_wind_speed numeric,
  ow_clouds     numeric,
  n             int
)
language sql
stable
as $$
  with clean as (
    select
      f.recorded_at as ts,
      nullif(f.aqi,        -1) as aqi,
      nullif(f.pm25_value, -1) as pm25,
      nullif(f.pm10_value, -1) as pm10,
      nullif(f.co_value,   -1) as co,
      nullif(f.o3_value,   -1) as o3,
      nullif(f.no2_value,  -1) as no2,
      nullif(f.so2_value,  -1) as so2,
      f.ow_aqi,
      f.ow_pm25,
      f.ow_pm10,
      f.ow_o3,
      f.ow_no2,
      f.ow_so2,
      f.ow_co,
      f.ow_nh3,
      f.ow_temp,
      f.ow_feels_like,
      f.ow_humidity,
      f.ow_pressure,
      f.ow_wind_speed,
      f.ow_clouds
    from fact_air_quality f
    join dim_station d on d.station_key = f.station_key
    where d.station_id = p_station_id
      and f.recorded_at is not null
  ),
  bucketed as (
    select
      case p_granularity
        when 'hour'  then to_char(date_trunc('hour',  ts), 'YYYY-MM-DD HH24:00')
        when 'month' then to_char(date_trunc('month', ts), 'YYYY-MM')
        else              to_char(date_trunc('day',   ts), 'YYYY-MM-DD')
      end as bucket,
      *
    from clean
  )
  select
    bucket,
    round(avg(aqi))             as aqi,
    round(avg(pm25), 1)         as pm25,
    round(avg(pm10), 1)         as pm10,
    round(avg(co),   2)         as co,
    round(avg(o3),   1)         as o3,
    round(avg(no2),  1)         as no2,
    round(avg(so2),  1)         as so2,
    round(avg(ow_aqi))          as ow_aqi,
    round(avg(ow_pm25), 1)      as ow_pm25,
    round(avg(ow_pm10), 1)      as ow_pm10,
    round(avg(ow_o3),   1)      as ow_o3,
    round(avg(ow_no2),  1)      as ow_no2,
    round(avg(ow_so2),  1)      as ow_so2,
    round(avg(ow_co),   1)      as ow_co,
    round(avg(ow_nh3),  2)      as ow_nh3,
    round(avg(ow_temp), 1)      as ow_temp,
    round(avg(ow_feels_like),1) as ow_feels_like,
    round(avg(ow_humidity))     as ow_humidity,
    round(avg(ow_pressure))     as ow_pressure,
    round(avg(ow_wind_speed),1) as ow_wind_speed,
    round(avg(ow_clouds))       as ow_clouds,
    count(*)::int               as n
  from bucketed
  group by bucket
  order by bucket desc
  limit p_limit;
$$;

grant execute on function get_station_history(text, text, int) to anon, authenticated, service_role;

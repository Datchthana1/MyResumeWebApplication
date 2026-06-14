-- ===========================================================================
-- Supabase RPC: per-station history, aggregated by hour / day / month.
-- Run this ONCE in the Supabase SQL Editor (same project as air_stations),
-- in addition to monitor.sql.
--
-- Source is the raw `air_stations` table. recorded_at is a `timestamp` column;
-- air4thai encodes "no reading" as -1, so those negatives are nulled before
-- averaging. OpenWeather (ow_*) fields are always populated per row and can be
-- negative (temperature), so they are averaged as-is.
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
      recorded_at::timestamp as ts,
      -- cast via text first so it works whether the column is text or numeric
      nullif(nullif(aqi::text, '')::numeric, -1) as aqi,
      nullif(pm25_value::numeric, -1)      as pm25,
      nullif(pm10_value::numeric, -1)      as pm10,
      nullif(co_value::numeric,   -1)      as co,
      nullif(o3_value::numeric,   -1)      as o3,
      nullif(no2_value::numeric,  -1)      as no2,
      nullif(so2_value::numeric,  -1)      as so2,
      ow_aqi::numeric        as ow_aqi,
      ow_pm25::numeric       as ow_pm25,
      ow_pm10::numeric       as ow_pm10,
      ow_o3::numeric         as ow_o3,
      ow_no2::numeric        as ow_no2,
      ow_so2::numeric        as ow_so2,
      ow_co::numeric         as ow_co,
      ow_nh3::numeric        as ow_nh3,
      ow_temp::numeric       as ow_temp,
      ow_feels_like::numeric as ow_feels_like,
      ow_humidity::numeric   as ow_humidity,
      ow_pressure::numeric   as ow_pressure,
      ow_wind_speed::numeric as ow_wind_speed,
      ow_clouds::numeric     as ow_clouds
    from air_stations
    where station_id = p_station_id
      and recorded_at is not null
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

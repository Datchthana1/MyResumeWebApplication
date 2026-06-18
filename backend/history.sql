-- ===========================================================================
-- Supabase RPC for a single station's history (chart + table on the monitor).
-- Run this ONCE in the Supabase SQL Editor.
--
-- SOURCE: the PER-STATION table station_<station_id> produced by PL1
--   (transform_station) — NOT the dim/fact mart. The table name is derived the
--   same way PL1 builds it: 'station_' + station_id with every non-alphanumeric
--   character replaced by '_'.
--
-- recorded_at is fixed-format text ("YYYY-MM-DD HH:MM:SS") in station_*, so it
-- is cast to timestamp for date_trunc bucketing. Output columns are unchanged
-- so the API/frontend contract stays the same.
--
-- Both air4thai (aqi, pm25, pm10, co, o3, no2, so2) and OpenWeather (ow_*,
-- including ow_co) readings are carried through PL1 into station_*, so the full
-- history is available per station. Requires the updated PL1 transform
-- (air-station-transform.sql / transform-all-stations.sql) that adds ow_co.
-- ===========================================================================

create or replace function get_station_history(
  p_station_id text,
  p_granularity text default 'day',
  p_limit int default 7
)
returns table (
  bucket        text,
  aqi           numeric,
  pm25          numeric,
  pm10          numeric,
  co            numeric,
  o3            numeric,
  no2           numeric,
  so2           numeric,
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
language plpgsql
stable
as $$
declare
  v_tbl text := 'station_' || regexp_replace(p_station_id, '[^a-zA-Z0-9]', '_', 'g');
begin
  -- Station never transformed (no per-station table yet) -> empty result.
  if not exists (
    select 1 from pg_tables
    where schemaname = 'public' and tablename = v_tbl
  ) then
    return;
  end if;

  return query execute format($f$
    with clean as (
      select
        recorded_at::timestamp   as ts,
        nullif(aqi,        -1)    as aqi,
        nullif(pm25_value, -1)    as pm25,
        nullif(pm10_value, -1)    as pm10,
        nullif(co_value,   -1)    as co,
        nullif(o3_value,   -1)    as o3,
        nullif(no2_value,  -1)    as no2,
        nullif(so2_value,  -1)    as so2,
        ow_aqi,
        ow_pm25,
        ow_pm10,
        ow_o3,
        ow_no2,
        ow_so2,
        ow_co,
        ow_nh3,
        ow_temp,
        ow_feels_like,
        ow_humidity,
        ow_pressure,
        ow_wind_speed,
        ow_clouds
      from %I
      where recorded_at is not null
    ),
    bucketed as (
      select
        case %L
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
    limit %s
  $f$, v_tbl, p_granularity, p_limit);
end;
$$;

grant execute on function get_station_history(text, text, int) to anon, authenticated, service_role;

"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";

// Colours match the rest of the monitor: emerald = reported, rose = missing.
const REPORTED = "#10b981";
const MISSING = "#f43f5e";

/**
 * Thailand map of every station with a valid coordinate. Reported stations are
 * small green dots; missing stations are larger red dots that carry a permanent
 * "missing" label and a popup. Rendered client-only (Leaflet needs `window`),
 * so callers import it via next/dynamic with { ssr: false }.
 */
export default function StationMap({ stations = [], lang = "en", m }) {
  const points = stations.filter(
    (s) =>
      typeof s.lat === "number" &&
      typeof s.lon === "number" &&
      !Number.isNaN(s.lat) &&
      !Number.isNaN(s.lon) &&
      !(s.lat === 0 && s.lon === 0),
  );

  const areaOf = (s) =>
    (lang === "th" ? s.area_th || s.area_en : s.area_en || s.area_th) || s.station_id;

  return (
    <MapContainer
      center={[13.0, 101.0]}
      zoom={5}
      scrollWheelZoom={false}
      className="relative z-0 h-[460px] w-full rounded-3xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((s) => {
        const color = s.reported ? REPORTED : MISSING;
        return (
          <CircleMarker
            key={s.station_id}
            center={[s.lat, s.lon]}
            radius={s.reported ? 5 : 8}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: s.reported ? 0.7 : 0.85,
              weight: s.reported ? 1 : 2,
            }}
          >
            {/* Always-on label so missing stations are obvious at a glance. */}
            {!s.reported && (
              <Tooltip permanent direction="top" offset={[0, -6]}>
                <span style={{ color: MISSING, fontWeight: 600 }}>{m.statusMissing}</span>
              </Tooltip>
            )}

            <Popup>
              <div style={{ minWidth: 180, lineHeight: 1.5 }}>
                <strong>{areaOf(s)}</strong>
                <br />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#888" }}>
                  {s.station_id}
                </span>
                <br />
                <span style={{ color, fontWeight: 600 }}>
                  ● {s.reported ? m.statusReported : m.statusMissing}
                </span>
                <br />
                {m.colLastSeen}: {s.last_created_at ?? "—"}
                <br />
                {m.colAqi}: {s.last_aqi ?? "—"}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";

// Matches the rest of the monitor: emerald = ok, amber = stale reading, rose = missing.
const COLORS = { ok: "#10b981", stale: "#f59e0b", missing: "#f43f5e" };

/**
 * Thailand map of every station with a valid coordinate. Colour encodes status:
 * ok (reading fresh), stale (re-written but reading old), missing (not in the
 * latest snapshot). Stale/missing dots are larger and carry an always-on label.
 * Rendered client-only via next/dynamic ({ ssr: false }).
 */
export default function StationMap({ stations = [], lang = "en", m, onSelect }) {
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

  const labelOf = (status) =>
    status === "ok" ? m.statusOk : status === "stale" ? m.statusStaleData : m.statusMissing;

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
        const status = s.status || (s.reported ? "ok" : "missing");
        const color = COLORS[status] || COLORS.missing;
        const ok = status === "ok";
        return (
          <CircleMarker
            key={s.station_id}
            center={[s.lat, s.lon]}
            radius={ok ? 5 : 8}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: ok ? 0.7 : 0.85,
              weight: ok ? 1 : 2,
            }}
          >
            {/* Always-on label so stale / missing stations stand out. */}
            {!ok && (
              <Tooltip permanent direction="top" offset={[0, -6]}>
                <span style={{ color, fontWeight: 600 }}>{labelOf(status)}</span>
              </Tooltip>
            )}

            <Popup>
              <div style={{ minWidth: 200, lineHeight: 1.55 }}>
                <strong>{areaOf(s)}</strong>
                <br />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "#888" }}>
                  {s.station_id}
                </span>
                <br />
                <span style={{ color, fontWeight: 600 }}>● {labelOf(status)}</span>
                <br />
                {m.colLastRecorded}: {s.last_recorded_at ?? "—"}
                <br />
                {m.colLastIngested}: {s.last_created_at ?? "—"}
                <br />
                {m.colAqi}: {s.last_aqi ?? "—"}
                {onSelect && (
                  <>
                    <br />
                    <button
                      type="button"
                      onClick={() => onSelect(s)}
                      style={{
                        marginTop: 6,
                        color: "#0a0a0a",
                        textDecoration: "underline",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        padding: 0,
                        font: "inherit",
                      }}
                    >
                      {m.viewDetail} →
                    </button>
                  </>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

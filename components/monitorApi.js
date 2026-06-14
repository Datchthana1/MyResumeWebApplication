// Single source of truth for the monitor backend base URL.
// Set NEXT_PUBLIC_MONITOR_API_URL on Vercel/Render; falls back to localhost for dev.
export const API_BASE =
  process.env.NEXT_PUBLIC_MONITOR_API_URL || "http://localhost:8000";

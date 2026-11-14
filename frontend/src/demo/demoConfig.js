// Two env vars control the live demo:
//   VITE_DEMO_MODE=true  This build is the demo site: its VITE_API_URL points
//                        at a backend running with DEMO_MODE=true.
//   VITE_DEMO_URL        On the main site, the demo site's start page,
//                        e.g. https://demo.workalignr.in/demo
// With neither set, every "Try live demo" link is hidden.
export const IS_DEMO_SITE = import.meta.env.VITE_DEMO_MODE === "true";

export const DEMO_ENTRY_URL = IS_DEMO_SITE ? "/demo" : import.meta.env.VITE_DEMO_URL || null;

export const DEMO_SESSION_MINUTES = 15;

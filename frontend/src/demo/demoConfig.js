// The live demo runs on this site (/demo), against the same backend, which
// keeps demo data in a separate schema. It's on by default:
//   VITE_DEMO_MODE=false  hides every "Try the live demo" link.
//   VITE_DEMO_URL         with VITE_DEMO_MODE=false, sends the links to a
//                         demo hosted elsewhere instead.
export const IS_DEMO_SITE = import.meta.env.VITE_DEMO_MODE !== "false";

export const DEMO_ENTRY_URL = IS_DEMO_SITE ? "/demo" : import.meta.env.VITE_DEMO_URL || null;

export const DEMO_SESSION_MINUTES = 15;

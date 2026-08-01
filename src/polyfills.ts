// Polyfills must be imported first in main.tsx before any other modules
// (e.g. casbin relies on Node.js Buffer at module evaluation time)
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;

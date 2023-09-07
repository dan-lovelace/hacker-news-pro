import { TextEncoder, TextDecoder } from "util";

import { config } from "dotenv";

config({
  path: "test/.env",
});

// JSDOM requires a global text encoder and decoder
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

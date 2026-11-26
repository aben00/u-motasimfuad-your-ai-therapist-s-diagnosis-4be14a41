// Your AI Therapist's Diagnosis — make.fun entry
// Writes the one-line diagnosis to /output/entry.txt (or MAKEFUN_OUTPUT_DIR).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "Diagnosis: chronic over-apologising \u2014 you said sorry to me, a chatbot, seven times today, and none to the friend you ghosted.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Gate self-check: 1-200 chars, single line, not only whitespace.
// The gate counts characters (not bytes): the em dash counts as one char.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
}
if (ENTRY.trim().length === 0) throw new Error("entry is only whitespace");
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify byte-for-byte.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${outPath} (${ENTRY.length} chars) sha256=${sha}`);

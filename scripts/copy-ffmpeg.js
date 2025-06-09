import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = join(__dirname, "..");

// Create public directory if it doesn't exist
const publicDir = join(rootDir, "public");
mkdirSync(publicDir, { recursive: true });

// Copy FFmpeg core files
const ffmpegCorePath = join(rootDir, "node_modules", "@ffmpeg", "core", "dist");
const files = ["ffmpeg-core.js", "ffmpeg-core.wasm"];

files.forEach((file) => {
  const sourcePath = join(ffmpegCorePath, file);
  const targetPath = join(publicDir, file);
  copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${file} to public directory`);
});

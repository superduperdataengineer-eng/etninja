import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT_FILE = path.join(ROOT, "js-files.json");

// folders to scan
const TARGET_DIRS = ["src", "public"];

// folders to ignore
const IGNORE_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build"
];

function walk(dir, files) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORE_DIRS.includes(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push({
        relativePath: fullPath
          .replace(ROOT, "")
          .replace(/\\/g, "/"),
        content: fs.readFileSync(fullPath, "utf8"),
      });
    }
  }
}

const files = [];

for (const dir of TARGET_DIRS) {
  const fullDir = path.join(ROOT, dir);
  if (fs.existsSync(fullDir)) {
    walk(fullDir, files);
  }
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(files, null, 2), "utf8");

console.log(`✔ Generated ${files.length} JS files → js-files.json`);

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const OUT = path.join(ROOT, "root-index.json");

// HARD WHITELIST — nothing else will ever load
const FILES = [
  ".env.local",
  ".gitignore",
  "ALL_JS_FILES_cleaned.txt",
  "ALL_JS_FILES_cleanedNEWONE.txt",
  "ALL_JS_FILES.txt",
  "components.json",
  "eslint.config.mjs",
  "folder_structure.txt",
  "generate-js-index.js",
  "generateJSON.js",
  "generateJSONToggle.js",
  "generateRoot.js",
  "generateTree.js",
  "js-files.json",
  "next-env.d.ts",
  "next.config.ts",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "public_tree.txt",
  "README.md",
  "root-index.json",
  "src_tree.txt",
  "toggleTPR.json",
  "treest.txt",
  "tsconfig.json"
];

const existing = FILES.filter(name =>
  fs.existsSync(path.join(ROOT, name))
);

fs.writeFileSync(OUT, JSON.stringify(existing, null, 2));
console.log("✅ root-index.json written with whitelisted files only");

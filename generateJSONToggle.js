// generateJSONToggle.js
const fs = require("fs");
const path = require("path");

const IMAGE_DIR = path.join(__dirname, "public", "toggleTPR");
const OUTPUT_FILE = path.join(__dirname, "toggleTPR.json");

const VALID_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

function generateJSON() {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error("❌ Directory does not exist:", IMAGE_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGE_DIR);

  const images = files
    .filter(file =>
      VALID_EXTENSIONS.includes(path.extname(file).toLowerCase())
    )
    .map(file => ({
      name: file,
      src: `/toggleTPR/${file}`
    }));

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(images, null, 2),
    "utf-8"
  );

  console.log(`✅ Generated ${images.length} entries in toggleTPR.json`);
}

generateJSON();

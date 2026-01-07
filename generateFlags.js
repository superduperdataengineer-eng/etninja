const fs = require("fs");
const path = require("path");

const FLAGS_DIR = "C:/Users/msitr/etninja/public/flags";
const OUTPUT_FILE = "C:/Users/msitr/etninja/src/app/blogs/flags/flagprintJSON.js";

function getFilesRecursively(dir, baseDir = dir) {
  let results = [];

  const list = fs.readdirSync(dir, { withFileTypes: true });

  list.forEach((item) => {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      results.push({
        name: item.name,
        path: "/" + path.relative(baseDir, fullPath).replace(/\\/g, "/"),
        extension: path.extname(item.name).replace(".", ""),
      });
    }
  });

  return results;
}

const files = getFilesRecursively(FLAGS_DIR);

const output = `// AUTO-GENERATED FILE – DO NOT EDIT
// Generated on ${new Date().toISOString()}

const flagprintJSON = ${JSON.stringify(files, null, 2)};

export default flagprintJSON;
`;

fs.writeFileSync(OUTPUT_FILE, output, "utf8");

console.log("✅ flagprintJSON.js generated successfully!");

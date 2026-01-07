const fs = require("fs");
const path = require("path");

const DIR = "C:/Users/msitr/etninja/public/character";
const OUT = "C:/Users/msitr/etninja/src/app/blogs/character/fbxList.js";

const files = fs
  .readdirSync(DIR)
  .filter(f => f.toLowerCase().endsWith(".fbx"))
  .map(f => ({
    name: f.replace(".fbx", ""),
    path: `/character/${f}`,
  }));

const content = `// AUTO-GENERATED
const fbxList = ${JSON.stringify(files, null, 2)};
export default fbxList;
`;

fs.writeFileSync(OUT, content, "utf8");
console.log("✅ FBX list generated");

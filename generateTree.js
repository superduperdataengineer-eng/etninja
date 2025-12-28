const fs = require("fs");
const path = require("path");

// Folders to scan
const foldersToScan = ["src", "public"];

// Recursive function to build the tree
function buildTree(dirPath) {
  const stats = fs.statSync(dirPath);
  const info = {
    name: path.basename(dirPath),
    type: stats.isDirectory() ? "folder" : "file",
  };

  if (stats.isDirectory()) {
    const children = fs.readdirSync(dirPath)
      .map((child) => buildTree(path.join(dirPath, child)))
      .sort((a, b) => {
        // Folders first, then files
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "folder" ? -1 : 1;
      });
    info.children = children;
  }

  return info;
}

// Build the tree only for src and public
const tree = foldersToScan
  .filter((folder) => fs.existsSync(folder))
  .map((folder) => buildTree(path.resolve(folder)));

// Save to JSON in the root
const outputPath = path.join(__dirname,"public", "tree.json");
fs.writeFileSync(outputPath, JSON.stringify(tree, null, 2), "utf-8");

console.log(`Tree saved to ${outputPath}`);

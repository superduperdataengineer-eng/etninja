import fs from "fs";
import path from "path";

function getAllJsFiles(dir, root) {
  let files = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getAllJsFiles(fullPath, root));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push({
        relativePath: fullPath
          .replace(root, "")
          .replace(/\\/g, "/"),
        content: fs.readFileSync(fullPath, "utf8"),
      });
    }
  }

  return files;
}

export default function Page() {
  const root = process.cwd();

  const srcDir = path.join(root, "src");
  const publicDir = path.join(root, "public");

  const files = [
    ...(fs.existsSync(srcDir) ? getAllJsFiles(srcDir, root) : []),
    ...(fs.existsSync(publicDir) ? getAllJsFiles(publicDir, root) : []),
  ];

  return (
    <main style={{ padding: 24, fontFamily: "monospace" }}>
      <h1>All .js Files (src + public)</h1>

      {files.map((file) => (
        <section
          key={file.relativePath}
          style={{
            marginTop: 32,
            paddingTop: 12,
            borderTop: "2px solid #000",
          }}
        >
          {/* FULL PATH ACROSS THE TOP */}
          <div
            style={{
              fontWeight: "bold",
              fontSize: 13,
              marginBottom: 8,
              color: "#333",
            }}
          >
            {file.relativePath}
          </div>

          <pre
            style={{
              background: "#f5f5f5",
              padding: 16,
              overflowX: "auto",
              fontSize: 12,
            }}
          >
            {file.content}
          </pre>
        </section>
      ))}
    </main>
  );
}

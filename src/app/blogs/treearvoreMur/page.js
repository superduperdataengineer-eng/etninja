"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    fetch("/tree.json")
      .then((res) => res.json())
      .then((data) => setTree(data))
      .catch((err) => console.error("Failed to fetch tree.json:", err));
  }, []);

  // Recursive function to generate ASCII tree lines
  const renderAsciiTree = (node, prefix = "") => {
    const isFolder = node.type === "folder";
    const children = node.children || [];
    const lines = [];

    const connector = prefix ? (node === children[children.length - 1] ? "└── " : "├── ") : "";
    lines.push(prefix + (isFolder ? node.name : node.name));

    if (children.length > 0) {
      children.forEach((child, idx) => {
        const isLast = idx === children.length - 1;
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        lines.push(...renderAsciiTree(child, newPrefix));
      });
    }

    return lines;
  };

  if (!tree) return <p>Loading tree...</p>;

  return (
    <pre style={{ padding: "2rem", fontFamily: "monospace" }}>
      {tree.map((node) => renderAsciiTree(node).join("\n")).join("\n")}
    </pre>
  );
}

// export default function Page() {
//   return null;
// }


export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Code</h1>

      <iframe
        src="/texts/kotTree.txt"
        style={{
          width: "100%",
          height: "85vh",
          marginTop: 16,
          background: "#0d0d0d",
          border: "1px solid #333",
          borderRadius: 6
        }}
      />
    </main>
  );
}

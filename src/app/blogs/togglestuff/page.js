import Image from "next/image";
import images from "../../../../toggleTPR.json";

export default function ToggleStuffPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Toggle TPR</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {images.map((img) => (
          <div
            key={img.src}
            style={{ textAlign: "center" }}
          >
            <Image
              src={img.src}
              alt={img.name}
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
              {img.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

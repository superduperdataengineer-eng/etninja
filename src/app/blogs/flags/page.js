import flagprintJSON from "./flagprintJSON";
import Image from "next/image";

export default function FlagsPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 150px)", gap: "16px" }}>
      {flagprintJSON.map((flag, i) => (
        <div key={i}>
          <Image
            src={`/flags${flag.path}`}
            alt={flag.name}
            width={150}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <p>{flag.name}</p>
        </div>
      ))}
    </div>
  );
}

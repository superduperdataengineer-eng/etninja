import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const PDFParse = (await import("pdf-parse")).default;

    const pdfPath = path.join(process.cwd(), "public", "thekid", "pdfText", "thekid.pdf");
    const pdfBuffer = fs.readFileSync(pdfPath);

    const data = await PDFParse(pdfBuffer);
    const fullText = data.text;

    const sections = fullText
      .split(/\n(?=\d+\.)/) // split at newlines followed by numbers
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return new Response(JSON.stringify(sections), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to read PDF", { status: 500 });
  }
}

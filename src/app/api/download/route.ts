import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import { promisify } from "util";
import createTemplateSheet1 from "./create-template-sheet-1";

export async function POST(req: Request) {
  const formData = await req.formData();

  const names = formData.get("names")?.toString() ?? "";
  const systemName = formData.get("systemName")?.toString() ?? "";
  const domain = formData.get("domain")?.toString() ?? "";
  const color = formData.get("color")?.toString() ?? "";
  const logoFile = formData.get("logo") as File | null;

  if (!names || !systemName || !domain) {
    return new Response("Campos obrigatórios não informados", { status: 400 });
  }

  const logoBuffer = await logoFile?.arrayBuffer();

  try {
    const { sheetBuffer, sheetFileName } = await createTemplateSheet1({
      names: names.split(",").map((n) => n.trim()),
      color: color,
      domain: domain,
      systemName: systemName,
      logoBuffer: logoBuffer || undefined,
    });

    return new NextResponse(sheetBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=${sheetFileName}.xlsx"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Não foi possível gerar o arquivo." },
      { status: 404 }
    );
  }
}

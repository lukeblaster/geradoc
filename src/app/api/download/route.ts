import { NextResponse } from "next/server";
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
  } catch (e) {
    return NextResponse.json(
      { error: e, message: "Não foi possível gerar o arquivo" },
      { status: 404 }
    );
  }
}

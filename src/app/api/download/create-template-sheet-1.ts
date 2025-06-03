import ExcelJS from "exceljs";
import generator from "generate-password-ts";
import { hexToARGB } from "@/app/utils/hexToArgb";

interface CreateSheetFileInput {
  names: string[];
  systemName: string;
  domain: string;
  color: string;
  logoBuffer: ArrayBuffer | undefined;
}

export default async function createTemplateSheet1(
  params: CreateSheetFileInput
) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "GeraDoc by Lucas Soares";
  workbook.lastModifiedBy = "GeraDoc by Lucas Soares";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();
  workbook.properties.date1904 = true;
  workbook.calcProperties.fullCalcOnLoad = true;
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  const names = params.names;
  const domain = params.domain;
  const systemName = params.systemName;
  const argbColor = hexToARGB(params.color || "#FFF");

  const worksheet = workbook.addWorksheet("Usuários", {
    properties: {
      defaultColWidth: 25,
    },
  });

  // Styles
  const font = { name: "Arial", size: 12 };
  worksheet.columns = [
    { header: "Name", key: "name", width: 25, style: { font: font } },
    { header: "Username", key: "username", width: 45, style: { font: font } },
    { header: "Password", key: "password", width: 20, style: { font: font } },
  ];

  const rows = names.map((name: string) => {
    const separatedName = name.split(" ");
    const firstName = separatedName[0].toLowerCase();
    const secondName = separatedName[1]?.toLowerCase();

    const username = secondName
      ? firstName + "." + secondName + `${domain}`
      : firstName + `${domain}`;

    const password = generator.generate({ length: 7, numbers: true });

    return [name, username, password];
  });

  worksheet.mergeCells("A1:C2");
  worksheet.getCell(
    "C2"
  ).value = `USUÁRIOS - ${systemName.toLocaleUpperCase()}`;
  worksheet.getCell("C2").alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getCell("A1").font = { name: "Arial", size: 14, bold: true };
  worksheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: argbColor },
  };

  if (params.logoBuffer) {
    const logo = workbook.addImage({
      buffer: params.logoBuffer,
      extension: "png",
    });
    worksheet.addImage(logo, {
      tl: { col: 0.45253, row: 0.1615 },
      ext: { width: 30, height: 30 },
    });
  }

  worksheet.addTable({
    name: "dadosUsuarios",
    ref: "A3",
    headerRow: true,
    totalsRow: false,
    style: {
      theme: "TableStyleLight1",
      showRowStripes: true,
    },
    columns: [
      { name: "NOME", totalsRowLabel: "Totals:", filterButton: true },
      { name: "USUÁRIO", totalsRowFunction: "sum", filterButton: true },
      { name: "SENHA", totalsRowFunction: "sum", filterButton: false },
    ],
    rows: rows,
  });

  worksheet.getColumn(1).alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getColumn(2).alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getColumn(3).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  const sheetFileName = `usuarios ${domain.toLocaleLowerCase()}`;
  const sheetBuffer = await workbook.xlsx.writeBuffer();

  return { sheetBuffer, sheetFileName };
}

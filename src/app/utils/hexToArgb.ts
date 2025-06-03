export function hexToARGB(hex: string) {
  if (hex.startsWith("#")) hex = hex.slice(1);

  // Converte #RGB para #RRGGBB
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Formato inválido. Use #RGB ou #RRGGBB.");
  }

  const a = "FF"; // Alpha fixo
  const argb = a + hex.toUpperCase(); // Concatena no formato AARRGGBB
  return argb;
}

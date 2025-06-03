"use client";

import ThemeController from "./components/theme-controller";

export default function Home() {
  const handleSubmit = async (formData: FormData) => {
    const res = await fetch("/api/download", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Erro ao gerar arquivo");
      return;
    }

    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition");
    const fileName = disposition?.match(/filename="?(.+?)"?$/);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName ? fileName[1] : "arquivo.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center p-3 justify-center h-full bg-base-200">
      <div className="flex w-full justify-end items-end">
        <ThemeController />
      </div>
      <div className="card flex flex-col h-full min-w-2/6 justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className="flex flex-col h-auto w-full justify-center p-6 rounded-md bg-base-100"
        >
          <div className="card-title gap-0.5 justify-center items-end text-center">
            <h2 className="font-bold">GeraDOC</h2>
            <span className="text-xs">by Lucas Silva</span>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Templates</legend>
            <div className="indicator">
              <span className="indicator-item status status-success"></span>
              <div className="px-3 py-2 border max-w-24 rounded-sm text-center text-xs">
                Template 1
              </div>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nome do sistema</legend>
            <input
              type="text"
              name="systemName"
              placeholder="System Sistemas"
              className="input w-full rounded-sm border-2 border-neutral"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nomes dos usuários</legend>
            <textarea
              className="textarea w-full rounded-sm max-h-32 border-2 border-neutral"
              name="names"
            />
            <label className="label">
              (Separado por vírgula. Ex: Lucas Silva, Carlos, Jonas Almeida)
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Domínio</legend>
            <input
              type="text"
              name="domain"
              placeholder="@dominio.com.br"
              className="input w-full rounded-sm border-2 border-neutral"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Cor de fundo</legend>
            <input
              type="text"
              name="color"
              placeholder="#F2F2F2"
              className="input w-full rounded-sm border-2 border-neutral"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Logo</legend>
            <input
              type="file"
              accept="image/png"
              name="logo"
              className="file-input w-full rounded-sm"
            />
          </fieldset>

          <button type="submit" className="btn btn-primary mt-2 rounded-sm">
            Gerar planilha
          </button>
        </form>
      </div>
    </div>
  );
}

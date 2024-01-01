import { backendApi } from "api";

export const handleDownload = async (file, name) => {
  try {
    const response = await backendApi.get(
      `${import.meta.env.VITE_API_URL}/files/documents/${file}`,
      {
        responseType: "blob",
      }
    );

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `Reglas - ${name}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Download failed", error);
  }
};

import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  const config = {
    plugins: [react(), jsconfigPaths()],
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    base: "https://arrau.chillan.ubiobio.cl/tromu/",
  };
  return config;
});

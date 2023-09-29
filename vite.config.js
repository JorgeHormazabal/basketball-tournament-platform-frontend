import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
  };

  if (command !== "serve") {
    config.base = "/basketball-tournament-platform-frontend/";
  }

  return config;
});

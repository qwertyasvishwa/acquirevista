import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about/index.html",
        services: "services/index.html",
        contact: "contact/index.html",
        privacy: "privacy/index.html"
      }
    }
  }
});

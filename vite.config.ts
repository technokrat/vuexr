// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueXR",
      fileName: "vuexr",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const config = ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ['favicon.ico', 'robots.txt'],
        manifest: {
          name: 'Windows 11 in React',
          short_name: 'Win11React',
          description: 'Windows 11 made using React',
          theme_color: '#0078d7',
          icons: [
            {
              src: 'favicon.png',
              sizes: '192x192',
              type: 'image/png',
            }
          ],
        },
      }),
    ],
    base: "",
    define: {
      "process.env.NODE_ENV": `"${mode}"`,
      "import.meta.env.BASE_URL": JSON.stringify(""),
    },
    build: {
      outDir: "build",
      assetsDir: "assets",
      sourcemap: false,
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      open: true,
      port: 3000,
    },
  });
};

export default config;

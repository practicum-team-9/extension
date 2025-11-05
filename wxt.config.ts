import { defineConfig } from 'wxt';
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  extensionApi: "chrome",
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      manifest_version: 2,
      name: "YaForms Accessibility",
      description: "Extension to help visually impaired with Ya Forms",
      version: "1.0.0",
      permissions: [
        "activeTab",
        "scripting",
        "contextMenus",
        "storage",
        "tabs",
        "declarativeNetRequest",
      ]
    }
  },
  vite: (() => ({
    plugins: [
      tailwindcss(),
    ],
  })),
});

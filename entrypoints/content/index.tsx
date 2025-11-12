import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { newFormLoaded } from "./scripts/script";
import App from "./app/App";

export default defineContentScript({
  matches: ['https://forms.yandex.ru/u/*', 'https://forms.yandex.ru/cloud/*'],
  cssInjectionMode: "ui",
  allFrames: false,
  async main(ctx) {
    if (ctx.isInvalid) {
      console.log('WARNING! Something is wrong with the context!')
    }

    window.onload = async () => {
      const ui = await createShadowUI(ctx, "message")
      try {
        chrome.storage.local.get(["settingsData"], async (result) => {
          const isLightThemeOn = window.matchMedia("(prefers-color-scheme: light)").matches;
          if (!result.settingsData) {
            chrome.storage.local.set({"settingsData": {
              isExtensionOn: true,
              isSoundOn: true,
              isLightTheme: isLightThemeOn,
              apiKey: ""
            }}, () => {
                console.log('Settings created!')
            })
            ui.mount()
          } else if (result.settingsData.isExtensionOn) {
            ui.mount()            
          } else {
            console.log('The extension is off!')
          }
        });
      } catch (e) {
        console.log(e)
        ui.mount()            
      }
    } 

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        switch (message.action) {
          case "newForm":
            sendResponse({ status: "New Form action handled"})
            newFormLoaded()
            break;

          default:
            break;
        }
    })
  },
});


const createShadowUI = async (ctx: any, message: string) => {
  return createShadowRootUi(ctx, {
      name: "make-access",
      position: "inline",
      onMount: (uiContainer, shadow, shadowContainer) => {
        const app = document.createElement("div");
        uiContainer.append(app); 
        const root = ReactDOM.createRoot(app);
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        );
        return root;
      },
      onRemove(root) {
        root?.unmount();
      }
    });
}
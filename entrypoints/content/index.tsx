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
    // console.log('Hello content.');

    window.onload = async () => {
      // console.log('WINDOW IS LOADING!')
      const ui = await createShadowUI(ctx, "message")
      try {
        chrome.storage.local.get(["settingsData"], async (result) => {
          // console.log('Getting data from storage')
          // console.log(result)
          // console.log(result.settingsData)
          const isLightThemeOn = window.matchMedia("(prefers-color-scheme: light)").matches;
          // console.log('Current theme is light :', isLightThemeOn)
          if (!result.settingsData) {
            //console.log('Settings data does not exist yet!\nCREATING!')
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
        console.log('Error occured while trying to fetch data from storage.')
        console.log(e)
        ui.mount()            
      }
    } 

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        // console.log("Recieved action in content script", message)
        switch (message.action) {
          case "newForm":
            // console.log("NewForm action recieved")
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
  // console.log('creating shadow Ui')
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
        // console.log("Unmounting")
        root?.unmount();
      }
    });
}
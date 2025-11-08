import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { newFormLoaded } from "./scripts/script";
import App from "./app/App";

export default defineContentScript({
  matches: ['https://forms.yandex.ru/u/*'],
  cssInjectionMode: "ui",
  allFrames: false,
  async main(ctx) {
    if (ctx.isInvalid) {
      console.log('WARNING! Something is wrong with the context!')
    }
    console.log('Hello content.');

    window.onload = async () => {
      console.log('WINDOWS LOADING!')
      chrome.storage.local.get(["settingsData"], async (result) => {
        console.log('Getting data from storage')
        if (result.settingsData.isExtensionOn) {
          const ui = await createShadowUI(ctx, "message")
          ui.mount()            
        } else {
          console.log('The extension is off!')
        }
      });
    } 

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        console.log("Recieved action in content script", message)
        switch (message.action) {
          case "newForm":
            console.log("NewForm action recieved")
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
  console.log('creating shadow Ui')
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
        console.log("Unmounting")
        root?.unmount();
      }
    });
}


// const createIUI = async (ctx: any, message: string) => {
//   return createIntegratedUi(ctx, {
//       position: "inline",
//       anchor: "body",
//       onMount: (uiContainer) => {
//         const root = ReactDOM.createRoot(uiContainer);
//         root.render(
//           <React.StrictMode>
//             <div className="visible absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-900/50 ">
//               <h1>YaForms Accessibility</h1>
//               <h2>Hello World!</h2>
//               <p>{message}</p>
//             </div>
//           </React.StrictMode>
//         );
//         return root;
//       },
//       onRemove(root) {
//         console.log("Unmounting")
//         root?.unmount();
//       }
//     });
// }
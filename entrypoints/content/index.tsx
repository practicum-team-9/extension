import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { newFormLoaded } from "./scripts/script";

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: "ui",
  async main(ctx) {
    if (ctx.isInvalid) {
      console.log('WARNING! Something is wrong with the context!')
    }
    console.log('Hello content.');

    window.onload = async () => {
          const ui = await createShadowUI(ctx, "message")
          ui.mount()
    } 

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
      console.log("Recieved action in content script", message)
      // if (message.action === "newForm") {
      // }
      switch (message.action) {
        // case "promtUseModal":
        //   console.log("Promt to use modal action recieved")
        //   sendResponse({ status: "Make access action handled"})
        //   const ui = await createShadowUI(ctx, "message")
        //   ui.mount()
        //   break;

        // case "autoNewForm":
        //   console.log("autoNewForm action recieved")
        //   sendResponse({ status: "New Form action handled"})
        //   const formUi = await createIUI(ctx, "New Form ")
        //   formUi.mount()
        //   break;

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
  return createShadowRootUi(ctx, {
      name: "make-access",
      position: "inline",
      onMount: (uiContainer, shadow, shadowContainer) => {
        const app = document.createElement("div");
        uiContainer.append(app); 
        const root = ReactDOM.createRoot(app);
        root.render(
          <React.StrictMode>
            <div className="visible absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-900/50 ">
              <div className="bg-white rounded-3xl flex flex-col p-6 justify-center items-center w-2xl h-100 gap-4">
                <h1 className="text-5xl">YaForms Accessibility</h1>
                <button onClick={() => {
                  console.log('Button clicked!')
                  newFormLoaded()
                }} className="text-3xl bg-black text-white pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl border border-black">Начать</button>
                <button onClick={() => {root?.unmount }} className="text-3xl bg-white text-black pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl border border-black">Выключить расширение</button>
              </div>
            </div>
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
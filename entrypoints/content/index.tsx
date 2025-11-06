import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: "ui",
  async main(ctx) {
    if (ctx.isInvalid) {
      console.log('WARNING! Something is wrong with the context!')
    }
    console.log('Hello content.');

    window.onload = async () => {
          const ui = await createIUI(ctx, "message")
          ui.mount()
    } 

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
      console.log("Recieved action in content script", message)
      if (message.action === "newForm") {
          console.log("NewForm action recieved")
          sendResponse({ status: "New Form action handled"})
          const formUi = await createIUI(ctx, "New Form ")
          formUi.mount()
      }
      switch (message.action) {
        case "makeAccess":
          console.log("Make Access action recieved")
          sendResponse({ status: "Make access action handled"})
          const ui = await createUi(ctx, "message")
          ui.mount()
          break;
        case "newForm":
          break;
    
        default:
          break;
      }
    })
  },
});


const createUi = async (ctx: any, message: string) => {
  return createShadowRootUi(ctx, {
      name: "make-access",
      position: "inline",
      onMount: (uiContainer, shadow, shadowContainer) => {
        const app = document.createElement("div");
        uiContainer.append(app); 

        // const styles = {
        //   visibility: "visible",
        //   position: "fixed",
        //   top: "0",
        //   bottom: "0",
        //   right: "0",
        //   left: "0",
        //   zIndex: "9999",
        //   height: "100%",
        //   width: "100%",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   backgroundColor: "rgba(0, 0, 0, 0.5)",
        // };
        // Object.assign(shadowContainer.style, styles);
        const root = ReactDOM.createRoot(app);
        root.render(
          <React.StrictMode>
            <div className="visible absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-900/50 ">
              <h1>YaForms Accessibility</h1>
              <h2>Hello World!</h2>
              <p>{message}</p>
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


const createIUI = async (ctx: any, message: string) => {
  return createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (uiContainer) => {
        const root = ReactDOM.createRoot(uiContainer);
        root.render(
          <React.StrictMode>
            <div className="visible absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-900/50 ">
              <h1>YaForms Accessibility</h1>
              <h2>Hello World!</h2>
              <p>{message}</p>
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
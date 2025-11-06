export default defineBackground({
  main() {
    console.log('Hello background!', { id: browser.runtime.id });
    chrome.runtime.onInstalled.addListener(() => {
      console.log("Chrome runtime ON INSTALLED")
      chrome.contextMenus.create({
        id: "makeAccess",
        title: "Make form Accessible",
        contexts: ["all"],
      });

      chrome.tabs.onUpdated.addListener((tabId, tab) => {
          console.log(tab)
          chrome.tabs.sendMessage(tabId, {
              type: "newForm"
          })
          .then((res) => {
              console.log("Message recieved!")
          })
          .catch((err) => {
              console.log(err)
          })
      })

      chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === "makeAccess") {
          console.log(tab?.id)
          chrome.tabs.sendMessage(
            tab?.id!,
            { action: "makeAccess" },
            function (response) {
              console.info("Response is:", response)
            }
          );
        }
      })

    });
  },
});

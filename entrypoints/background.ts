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

      chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === "makeAccess") {
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

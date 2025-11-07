export default defineBackground({
  main() {
    console.log('Hello background!', { id: browser.runtime.id });
    chrome.runtime.onInstalled.addListener(() => {
      console.log("Chrome runtime ON INSTALLED")

      chrome.contextMenus.create({
        id: "newForm",
        title: "Making the new form accessible",
        contexts: ["all"],
      });

      chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === "newForm") {
          console.log(tab?.id)
          chrome.tabs.sendMessage(
            tab?.id!,
            { action: "newForm" },
            function (response) {
              console.info("Response is:", response)
            }
          );
        }
      })

    });
  },
});

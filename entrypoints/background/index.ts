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


    browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.type === "GREETING") {
        console.log("Received greeting:", message.payload);
        sendResponse("Acknowledged greeting!");
        if (sender.tab?.id) {
          console.log('Sending message')
          const response = await chrome.tabs.sendMessage(sender.tab.id,{ type: "SAYIT!", payload: message.payload });
          console.log("Received response from content script:", response);
        }
      }
      // Return true to indicate you want to send an asynchronous response
      return true;
    });


    browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.type === "settingsDataChanged") {
        console.log("Received settingsDataChanged");
        if (message.payload) {
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0].id) {
              chrome.tabs.sendMessage(tabs[0].id, { type: "setSettingsData", payload: message.payload });
            }
          });
        } 
        sendResponse("Acknowledged settingsDataChanged!");
        return true;
      }
      // Return true to indicate you want to send an asynchronous response
      return true;
    });

    });
  },
});

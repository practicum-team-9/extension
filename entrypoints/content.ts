export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    console.log('Hello content.');

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("Recieved action in content script", request)
      if (request.action === "makeAccess") {
        console.log("Make Access action recieved")
        sendResponse({ status: "Make access action handled"})
      }
    })
  },
});

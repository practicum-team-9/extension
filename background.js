console.log('Background Script works')

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
/*
chrome.tabs.onUpdated.addListener((tabId, tab) => {     
    chrome.tabs.query({active: true}, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab && activeTab.url.includes("forms.yandex.ru")) {
            chrome.tabs.sendMessage(tabId, {
                type: "newForm",
                formUrl: activeTab.url,
            })
        } else {
            console.log("There are no active tabs");
        }
    })
})*/

 
/*
chrome.tabs.query({active: true}, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.url.includes("forms.yandex.ru")) {
        chrome.tabs.sendMessage(tabId, {
            type: "newForm",
            formUrl: activeTab.url,
        })
    } else {
        console.log("There are no active tabs");
    }
})
    */
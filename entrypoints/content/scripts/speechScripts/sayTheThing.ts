export const sayTheThing = async (thing: string) => {
    try {
        chrome.storage.local.get(["settingsData"], async (result) => {
            if (result.settingsData.isSoundOn) {
                // console.log(thing)
                var utterance = new SpeechSynthesisUtterance(thing);
                window.speechSynthesis.cancel()
                window.speechSynthesis.speak(utterance)
            } 
        });
        return true;
    } 
    catch (e) {
        console.log('Error occurred while trying to speak!')
        console.log(e)
    }

    return true;
}

export const sayTheThingDelayed = (thing: string, delay?: number) => {
    sayTheThing(thing)
    window.speechSynthesis.pause()
    setTimeout(() => {
        window.speechSynthesis.resume()
        }, delay ? delay : 1000)
}
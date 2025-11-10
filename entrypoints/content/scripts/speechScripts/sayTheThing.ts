export const sayTheThing = async (thing: string) => {
    try {
        chrome.storage.local.get(["settingsData"], async (result) => {
            // console.log('SOUND: Getting data from storage')
            if (result.settingsData.isSoundOn) {
                // console.log(thing)
                var utterance = new SpeechSynthesisUtterance(thing);
                window.speechSynthesis.cancel()
                window.speechSynthesis.speak(utterance)
            } 
            // else {
            //     console.log('The sound is off!')
            // }
        });
        return true;
    } 
    catch (e) {
        console.log('Error occurred while trying to speak!')
        console.log(e)
    }

    return true;
}
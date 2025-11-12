import React from "react";

export interface ISettingsData {
    isExtensionOn: boolean;
    isSoundOn: boolean;
    isLightTheme: boolean;
    apiKey?: string;
}

export const useSettingsData = () => {
    const [settingsData, setSettingsData] = React.useState<ISettingsData>({
        isExtensionOn: true,
        isSoundOn: true,
        isLightTheme: true,
        apiKey: ""
    })
    
    useEffect(() => {
        chrome.storage.local.get(["settingsData"], (result) => {
            console.log('Getting data from storage')
            if (result.settingsData) {
                setSettingsData(result.settingsData)
            }
        });
    }, []);
    
    useEffect(() => {
        console.log('Change in settings data detected')
        console.log(settingsData)
        chrome.storage.local.set({ settingsData }, () => {
            console.log('Сохранено!')
            document.documentElement.classList.toggle( "dark",  !settingsData.isLightTheme ||    (!settingsData && window.matchMedia("(prefers-color-scheme: dark)").matches),);
            console.log(settingsData)
        }) 
    }, [settingsData]);

    return { settingsData, setSettingsData };
}
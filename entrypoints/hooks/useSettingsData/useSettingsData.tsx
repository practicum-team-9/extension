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
        console.log('useEffect Firing!')
        chrome.storage.local.get(["settingsData"], (result) => {
            console.log('Getting data from storage')
            if (result.settingsData) {
                setSettingsData(result.settingsData)
            }
        });
    }, []);

    return { settingsData, setSettingsData };
}
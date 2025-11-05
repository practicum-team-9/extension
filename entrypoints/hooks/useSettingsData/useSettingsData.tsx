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
            if (result.settingsData) {
                setSettingsData(result.settingsData)
            }
        });
    }, []);

    return { settingsData, setSettingsData };
}
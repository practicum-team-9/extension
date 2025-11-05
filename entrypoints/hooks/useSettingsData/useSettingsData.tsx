import React from "react";

export interface ISettingsData {
    isSoundOn: boolean;
    isLightTheme: boolean;
    apiKey?: string;
}

export const useSettingsData = () => {
    const [settingsData, setSettingsData] = React.useState<ISettingsData>({
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
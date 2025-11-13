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
            // console.log('Getting data from storage')
            if (result.settingsData) {
                // console.log('Полученные данные')
                // console.log(settingsData)
                setSettingsData(result.settingsData)
            } else {
                setSettingsData({                    
                    isExtensionOn: true,
                    isSoundOn: true,
                    isLightTheme: true,
                    apiKey: ""    
                })
            }
        });
    }, []);
    
    // useEffect(() => {
    //     console.log('Change in settings data detected')
    //     console.log(settingsData)
    //     chrome.storage.local.set({ settingsData }, () => {
    //         console.log('Сохранено!')
    //     }) 
    // }, [settingsData]);

    return { settingsData, setSettingsData };
}
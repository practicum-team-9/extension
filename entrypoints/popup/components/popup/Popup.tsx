import FancyToggle from "../fancyToggle/FancyToggle"
import "@/assets/tailwind.css";

import { ISettingsData, useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";
import SimpleToggle from "../simpleToggle/SimpleToggle";
import Logo from "../logo/Logo";
import VolumeToggle from "../fancyToggle/volumeToggle/VolumeToggle";
import ThemeToggle from "../fancyToggle/themeToggle/themeToggle";

export default function Popup() {
    const { settingsData, setSettingsData } = useSettingsData();


    // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //     if (request.action === "sayTheThing") {
    //     console.log("Message received in popup from content script:", request.data);
    //     if (settingsData.isSoundOn) {
    //         sendResponse({isSoundOn: settingsData.isSoundOn})
    //     }
    //     }
    // });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettingsData((prev: ISettingsData) => ({...prev, [name]: value}))
        console.log(value)
        console.log(settingsData)
    };
    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSettingsData((prev: ISettingsData) => ({...prev, [name]: checked}))
        console.log(settingsData)
        console.log(checked)
    };


    // const handleToggleExtension = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     handleChecked(e)
    //     chrome.storage.local.set({ settingsData }, () => {
    //         alert('Сохранено!')
    //     })
    //     console.log(settingsData)
    // };

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        console.log('SAVING SETTINGS DATA')
        console.log(settingsData)
        e.preventDefault();
        chrome.storage.local.set({ settingsData }, () => {
            alert('Сохранено! Для применения перезагрузите сстраницу!')
        })        
        const response = await chrome.runtime.sendMessage({ type: "settingsDataChanged", payload: settingsData });
        console.log("Received response from background:", response);

        return true;
    }

    //
    // <FancyToggle onChange={handleChecked} name="isLightTheme" isChecked={!settingsData.isLightTheme} isDisabled={!settingsData.isExtensionOn}>
    //     <ThemeToggle textOn="Светлая тема" textOff="Темная тема" />
    // </FancyToggle>

    return (
        <div className="w-[500px] p-6 flex flex-col gap-6 rounded-5xl">
            <div className="w-[424px] h-[48px] flex justify-around items-center">
                <Logo />
                <h1 className='text-3xl text-center'>YaForms accessibility</h1>
                <SimpleToggle name="isExtensionOn" isChecked={settingsData.isExtensionOn} onChange={handleChecked} />
            </div>
            <FancyToggle onChange={handleChecked} name="isSoundOn" isChecked={!settingsData.isSoundOn} isDisabled={settingsData.isExtensionOn}>
                <VolumeToggle textOn="Включить" textOff="Выключить" />
            </FancyToggle>
            <h2 className='text-2xl text-center'>API-ключ для Yandex SpeechKit</h2>
            <label>
                <input type="text" name="apiKey" placeholder={settingsData.apiKey ? settingsData.apiKey :"Введите ваш API ключ."} className='text-2xl text-center bg-[#E5E5E5] rounded-2xl w-full p-1 min-h-[64px]' onChange={handleChange} />
            </label>
            <button type="submit" onClick={handleSubmit} className="transition text-2xl text-center text-white bg-black rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer hover:border-[#262626] hover:bg-[#262626] focus:bg-[#262626]/85 border-2 border-black">💾 Сохранить</button>
        </div>
    )
}
import FancyToggle from "../fancyToggle/FancyToggle"
import "@/assets/tailwind.css";

import { ISettingsData, useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";
import SimpleToggle from "../simpleToggle/SimpleToggle";

export default function Popup() {
    const { settingsData, setSettingsData } = useSettingsData();
    
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
    };




    return (
        <div className="w-[500px] p-6 flex flex-col gap-6 rounded-5xl">
            <div className="w-[424px] h-[48px] flex justify-around">
                <div className="w-[48px] h-[48px] text-4xl">👁️</div>
                <h1 className='text-2xl'>YaForms accessibility</h1>
                <SimpleToggle name="isExtensionOn" isChecked={settingsData.isExtensionOn} onChange={handleChecked} />
            </div>
            <FancyToggle onChange={handleChecked} name="isSoundOn" isChecked={settingsData.isSoundOn} isDisabled={!settingsData.isExtensionOn} isOnEmoji={"🔊"} isOnText={"Включить"} isOffEmoji={"🔈"} isOffText={"Выключить"} isOnMessage={"soundOn"} isOffMessage={"soundOff"}  />
            <FancyToggle onChange={handleChecked} name="isLightTheme" isChecked={settingsData.isLightTheme} isDisabled={!settingsData.isExtensionOn} isOnEmoji={"☀️"} isOnText={"Светлая тема"} isOffEmoji={"🌙"} isOffText={"Темная тема"} isOnMessage={"lightTheme"} isOffMessage={"darkTheme"} />
            <h2>API-ключ для Yandex SpeechKit</h2>
            <label>
                <input type="text" placeholder="Введите ваш API ключ." />
            </label>
        </div>
    )
}
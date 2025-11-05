import FancyToggle from "../fancyToggle/FancyToggle"
import "@/assets/tailwind.css";
import Header from "../header/Header";
import { ISettingsData, useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";

export default function Popup() {
    const { settingsData, setSettingsData } = useSettingsData();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettingsData((prev: ISettingsData) => ({...prev, [name]: value}))
    };




    return (
        <div className="w-[500px] p-6 flex flex-col gap-6 rounded-5xl">
            <Header />
            <FancyToggle isOnEmoji={"🔊"} isOnText={"Включить"} isOffEmoji={"🔈"} isOffText={"Выключить"} isOnMessage={"soundOn"} isOffMessage={"soundOff"}  />
            <FancyToggle isOnEmoji={"☀️"} isOnText={"Светлая тема"} isOffEmoji={"🌙"} isOffText={"Темная тема"} isOnMessage={"lightTheme"} isOffMessage={"darkTheme"} />
            <h2>API-ключ для Yandex SpeechKit</h2>
            <label>
                <input type="text" placeholder="Введите ваш API ключ." />
            </label>
        </div>
    )
}
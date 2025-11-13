import FancyToggle from "../fancyToggle/FancyToggle"
import "@/assets/tailwind.css";

import { ISettingsData, useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";
import SimpleToggle from "../simpleToggle/SimpleToggle";
import Logo from "../logo/Logo";
import VolumeToggle from "../fancyToggle/volumeToggle/VolumeToggle";
import ThemeToggle from "../fancyToggle/themeToggle/themeToggle";

export default function Popup() {
    const { settingsData, setSettingsData } = useSettingsData();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettingsData((prev: ISettingsData) => ({...prev, [name]: value}))
    };

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSettingsData((prev: ISettingsData) => ({...prev, [name]: checked}))
        // saveSettingsData(settingsData)
    };

    const handleToggleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setSettingsData((prev: ISettingsData) => ({...prev, [name]: checked}))
        // saveSettingsData(settingsData)
    };

    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        // console.log('SAVING SETTINGS DATA')
        // console.log(settingsData)
        e.preventDefault();
        saveSettingsData(settingsData)
    }

    const saveSettingsData = (settingsData: ISettingsData) => {
        chrome.storage.local.set({ settingsData }, () => {
            console.log('Сохранено!')
        }) 
    }

    useEffect(() => {
        // console.log(' Первоначальная настройка попапа!')
        chrome.storage.local.get(["settingsData"], (result) => {
            // console.log('Getting data from storage')
            if (result.settingsData) {
                setSettingsData(result.settingsData)
                // console.log(settingsData)
                document.documentElement.classList.toggle( "dark",  !settingsData.isLightTheme);
            }
        });
    }, [])

    useEffect(() => {
        // console.log('Применяю настройки!')
        // console.log(settingsData)
        document.documentElement.classList.toggle( "dark",  !settingsData.isLightTheme);
    }, [settingsData])

    return (
        <div className="w-[500px] m-1 p-6 flex flex-col gap-6 rounded-xl  border 
        bg-white border-[#E5E5E5] 
        dark:bg-black/85 dark:border-[#262626] dark:text-white">
            <div className="w-[424px] h-[48px] flex justify-around items-center">
                <Logo />
                <h1 className='text-3xl text-center'>YaForms accessibility</h1>
                <SimpleToggle name="isExtensionOn" isChecked={settingsData.isExtensionOn} onChange={handleChecked} />
            </div>
            <FancyToggle onChange={handleChecked} name="isSoundOn" isChecked={settingsData.isSoundOn} isDisabled={!settingsData.isExtensionOn}>
                <VolumeToggle textOn="Включить" textOff="Выключить" />
            </FancyToggle>
            <FancyToggle onChange={handleToggleDarkMode} name="isLightTheme" isChecked={settingsData.isLightTheme} isDisabled={!settingsData.isExtensionOn}>
                <ThemeToggle textOn="Светлая тема" textOff="Темная тема" />
            </FancyToggle>
            <button type="submit" onClick={handleSubmit} className="transition text-2xl text-center  rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer border-2
            text-white 
            bg-[#262626] border-[#262626]
            hover:bg-[#262626]/85 hover:border-[#262626]/85 
            focus:bg-[#262626]/85 focus:border-[#262626]            
            dark:bg-[#4b71d6] dark:border-[#4b71d6]
            dark:hover:bg-[#638fff] dark:hover:border-[#638fff]
            dark:focus:bg-[#638fff] dark:focus:border-[#4b71d6]   
            ">
            💾 Сохранить
            </button>
        </div>
    )
}

/* 

            <h2 className='text-2xl text-center'>API-ключ для Yandex SpeechKit</h2>
            <label>
                <input value={settingsData.apiKey} type="text" name="apiKey" placeholder={"Введите ваш API ключ"} className='text-2xl text-center rounded-2xl w-full p-1 min-h-[64px] 
                bg-[#E5E5E5] dark:bg-gray-500' onChange={handleChange} />
            </label>
            */ 
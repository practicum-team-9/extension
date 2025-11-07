import "@/assets/tailwind.css";
import { ReactNode } from "react";
import Modal from "../modal/Modal";
import { newFormLoaded } from "../scripts/script";
import { useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";

export default function App() {
    const [isModalVisible, setIsModalVisible] = useState(true)
    const { settingsData, setSettingsData } = useSettingsData();

    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.type === "SAYIT!") {
        console.log("Received SAYIT!");
        if (settingsData.isSoundOn) {
            console.log('SAYING IT, because sound is on :', settingsData.isSoundOn)
            console.log("PAYLOAD: \n", message.payload)
            var utterance = new SpeechSynthesisUtterance(message.payload);
            window.speechSynthesis.cancel()
            window.speechSynthesis.speak(utterance);
        } else {
            console.log('NOT SAYING IT, because sound is on :', settingsData.isSoundOn)
            console.log(settingsData)
        }
        sendResponse("Acknowledged SAYIT!");
        return true;
      }

      if (message.type === "setSettingsData") {
        console.log("Received setSettingsData");
        console.log(message.payload)
        if (message.payload) {
            setSettingsData(message.payload)
        } 
        sendResponse("Acknowledged setSettingsData!");
        return true;
      }
      // Return true to indicate you want to send an asynchronous response
      return true;
    });

    const hideModal = () => {
        setIsModalVisible(false)
    }
    return (
        <div>
            <Modal isVisible={isModalVisible}>
                <h1 className="text-5xl">YaForms Accessibility</h1>
                <button onClick={() => {
                console.log('Button clicked!');
                hideModal();
                newFormLoaded();
                }} className="text-3xl bg-black text-white pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl border border-black">Начать</button>
                <button onClick={hideModal} type="button" className="text-3xl bg-white text-black pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl border border-black">
                Выключить расширение
                </button>
            </Modal>
        </div>
)
    
}

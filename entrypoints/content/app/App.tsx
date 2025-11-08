import "@/assets/tailwind.css";
import Modal from "../modal/Modal";
import { newFormLoaded } from "../scripts/script";
import { useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";

export default function App() {
    const [isModalVisible, setIsModalVisible] = useState(true)
    const { settingsData } = useSettingsData();

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
                }} className="text-3xl bg-black text-white pt-2 pb-2 pl-4 pr-4 text-center justify-center border border-black rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer hover:border-[#262626] hover:bg-[#262626] focus:bg-[#262626]/85">Начать</button>
                <button onClick={hideModal} type="button" className="text-3xl bg-white text-black pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer border border-black">
                Закрыть
                </button>
            </Modal>
        </div>
)
    
}

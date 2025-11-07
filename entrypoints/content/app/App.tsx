import "@/assets/tailwind.css";
import { ReactNode } from "react";
import Modal from "../modal/Modal";
import { newFormLoaded } from "../scripts/script";

export default function App() {
    const [isModalVisible, setIsModalVisible] = useState(true)
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

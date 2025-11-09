import "@/assets/tailwind.css";
import Modal from "../modal/Modal";
import { newFormLoaded } from "../scripts/script";
import { useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";
import { getCurrentFormID } from "../scripts/utilityScripts/getCurrentFormID";


export interface iShadowFormPageItemsData {
    hidden: boolean,
    id: string,
    label: string,
    multiline: boolean,
    type: string,
    widget?: boolean,
    validations?: {type: string}[]
}

export interface iShadowFormPagesData {
    items: iShadowFormPageItemsData[]
}

export interface iShadowFormData {
    footer: boolean,
    id: string,
    iFrame: boolean,
    name: string,
    pages: iShadowFormPagesData[],
    teaser: true,
    texts?: {
        submit?: string,
        back?: string,
        next?: string
    }
}

export default function App() {
    const [isModalVisible, setIsModalVisible] = useState(true)
    const { settingsData } = useSettingsData();
    const [formData, setFormData] = useState([]); // Or null, or an empty object, depending on your data structure
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const hideModal = () => {
        setIsModalVisible(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = getCurrentFormID()
                const fetchUrl = `https://api.forms.yandex.net/v1/surveys/${id}/form`
                console.log(id)
                console.log(fetchUrl)
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setFormData(result);
                console.log(result)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <Modal isVisible={isModalVisible}>{
                loading ? 
                <h2>Загружаем...</h2>
                :
                <>
                    <h1 className="text-5xl">YaForms Accessibility</h1>
                    <p></p>
                    <button onClick={() => {
                    console.log('Button clicked!');
                    hideModal();
                    newFormLoaded();
                    }} className="text-3xl bg-black text-white pt-2 pb-2 pl-4 pr-4 text-center justify-center border border-black rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer hover:border-[#262626] hover:bg-[#262626] focus:bg-[#262626]/85">Начать</button>
                    <button onClick={hideModal} type="button" className="text-3xl bg-white text-black pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer border border-black">
                    Закрыть
                    </button>
                </>
                }
            </Modal>
        </div>
)
    
}

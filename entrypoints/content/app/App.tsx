import "@/assets/tailwind.css";
import Modal from "../modal/Modal";
import { newFormLoaded } from "../scripts/script";
import { useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";
import { getCurrentFormID } from "../scripts/utilityScripts/getCurrentFormID";
import Loader from "./components/loader/Loader";
import StartingScreen from "./screens/startingScreen/StartingScreen";


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
    const [formData, setFormData] = useState<iShadowFormData>(); // Or null, or an empty object, depending on your data structure
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const startInDOM = () => {
        hideModal();
        newFormLoaded();
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
                <Loader />
                :
                <StartingScreen startInDOM={startInDOM} startWithout={hideModal} startInShadowForm={()=> {console.log(formData)}} />
                }
            </Modal>
        </div>
)
    
}

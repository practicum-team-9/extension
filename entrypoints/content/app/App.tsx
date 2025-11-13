import "@/assets/tailwind.css";
import Modal from "./components/modal/Modal";
import { newFormLoaded } from "../scripts/script";
import { useSettingsData } from "@/entrypoints/hooks/useSettingsData/useSettingsData";
import { getCurrentFormID } from "../scripts/utilityScripts/getCurrentFormID";
import Loader from "./components/loader/Loader";
import StartingScreen from "./screens/startingScreen/StartingScreen";
import ShadowForm from "./screens/shadowForm/ShadowForm";
import FinalScreen from "./screens/finalScreen/FinalScreen";

export interface iShadowFormDropDownItemsData {
    id: string,
    label: string,
}

export interface iShadowFormPageItemsData {
    hidden: boolean,
    id: string,
    label: string,
    comment?: string,
    multiline: boolean,
    type: string,
    items?: iShadowFormDropDownItemsData[],
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
    teaser: boolean,
    texts?: {
        submit?: string,
        back?: string,
        next?: string
    }
}

interface iElementsVisibility {
    startingScreen: boolean,
    shadowForm: boolean,
    finalScreen: boolean
}

export default function App() {
    const [isModalVisible, setIsModalVisible] = useState(true)
    const { settingsData, setSettingsData } = useSettingsData();
    const [formData, setFormData] = useState<iShadowFormData>({
        footer: true,
        id: 'Загружаем...',
        iFrame: false,
        name: 'Загружаем',
        pages: [],
        teaser: true,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ elementsVisibility, setElementsVisibility ] = useState<iElementsVisibility>({
        startingScreen: false,
        shadowForm: false,
        finalScreen: false
    })

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const startInDOM = () => {
        hideModal();
        newFormLoaded();
    }

    const startInShadowForm = () => {
        setElementsVisibility(
            {
                startingScreen: false,
                shadowForm: true,
                finalScreen: false
            }
        )
    }    
    
    const showTheStartingScreen = () => {
        setElementsVisibility(
            {
                startingScreen: true,
                shadowForm: false,
                finalScreen: false
            }
        )}

    const showTheFinalScreen = () => {
        setElementsVisibility(
            {
                startingScreen: false,
                shadowForm: false,
                finalScreen: true
            }
        )}

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = getCurrentFormID()
                const fetchUrl = `https://api.forms.yandex.net/v1/surveys/${id}/form`
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setFormData(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
                setElementsVisibility({
                    startingScreen: true,
                    shadowForm: false,
                    finalScreen: false
                })
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        try  {
            chrome.storage.local.get(["settingsData"], async (result) => {
                setSettingsData(result.settingsData)
            });    
        } catch {
            console.log('Error!')
        }
    }, [elementsVisibility])

    useEffect(() => {              
        // console.log('Settings data application')
        // console.log(settingsData)
        document.querySelector('make-access')?.shadowRoot?.querySelector('body')?.classList.toggle("dark",  !settingsData?.isLightTheme || (!settingsData && window.matchMedia("(prefers-color-scheme: dark)").matches))
    }, [settingsData])


    return (
        <div>
            <Modal isVisible={isModalVisible}>
                <>{loading ? <Loader /> : <></>}</>
                <>
                    {elementsVisibility.startingScreen ? 
                    <StartingScreen 
                    isVisible={elementsVisibility.startingScreen} 
                    startInDOM={startInDOM} 
                    startWithout={hideModal} 
                    startInShadowForm={startInShadowForm}
                    showTheFinalScreen={showTheFinalScreen} 
                    showLoader={() => {
                        setLoading(true)
                        setElementsVisibility({
                            startingScreen: false,
                            shadowForm: false,
                            finalScreen: false
                        })
                    }} /> : 
                    <></> }
                </>
                <>
                    {elementsVisibility.shadowForm ? 
                    <ShadowForm shadowFormData={formData} previousScreen={showTheStartingScreen} nextScreen={showTheFinalScreen} /> : 
                    <></> }
                </>
                <>
                    {elementsVisibility.finalScreen ? 
                    <FinalScreen formName={formData.name} doItAgain={showTheStartingScreen} /> : 
                    <></> }
                </>
            </ Modal>
        </div>
)
    
}

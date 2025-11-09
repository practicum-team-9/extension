import "@/assets/tailwind.css";
import { iShadowFormData } from "../../App";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";
import ShadowQuestion from "./shadowQuestion/ShadowQuestion";
import { sayTheThing } from "@/entrypoints/content/scripts/speechScripts/sayTheThing";
import { useThingsToSay } from "@/entrypoints/hooks/useSettingsData/useThingsToSay";

interface iShadowFormProps {
    shadowFormData: iShadowFormData
}

interface iSubmitAnswers {
    [key: string] : string[],
}

export default function ShadowForm(props: iShadowFormProps) {
    const [ questionNumber, setQuestionNumber ] = useState(0)
    const [ pageNumber, setPageNumber ] = useState(0)
    const [ isValid, setIsValid ] = useState(true)
    const [ formState, setFormState ] = useState<iSubmitAnswers>()
    // const { thingsToSay } = useThingsToSay();

    const nextQuestion = () => {
        const maxPages = props.shadowFormData.pages.length
        console.log('Question N', questionNumber, 'Max Questions: ', props.shadowFormData.pages[pageNumber].items.length )
        console.log('Page N', pageNumber, 'Max Pages: ', props.shadowFormData.pages.length )

        if (pageNumber+1 == maxPages && questionNumber+1 == props.shadowFormData.pages[maxPages-1].items.length) {
            console.log('Should be Impossible!')
            console.log(pageNumber, ' out of ', maxPages)
        } else if (pageNumber+1 == maxPages && questionNumber+1 == props.shadowFormData.pages[maxPages-1].items.length) {
            console.log('It was the final questionCleaning Up!')
        } else if (questionNumber+1 == props.shadowFormData.pages[pageNumber].items.length) {
            console.log('Moving to the next page')
            setPageNumber(pageNumber+1)
            setQuestionNumber(0)
        } else {
            console.log('Next Question!')
            setQuestionNumber(questionNumber+1)
        }
    }

    const previousQuestion = () => {
        const maxPages = props.shadowFormData.pages.length
        console.log('Question N', questionNumber, 'Max Questions: ', props.shadowFormData.pages[pageNumber].items.length )
        console.log('Page N', pageNumber, 'Max Pages: ', props.shadowFormData.pages.length )

        if (pageNumber == 0 && questionNumber == 0) {
            console.log('Should be Impossible!')
        } else if (questionNumber == 0) {
            console.log('Moving to the previous page')
            setPageNumber(pageNumber-1)
            setQuestionNumber(0)
        } else {
            console.log('Previous Question!')
            setQuestionNumber(questionNumber-1)
        }
    }

    return (
        <div className="flex flex-col items-center ">
            <h1 className="text-5xl">{props.shadowFormData.name}</h1>
            <div className="w-3xl h-100 border border-[#E5E5E5] rounded-3xl flex flex-col p-6 justify-between">
                <ShadowQuestion shadowQuestionData={props.shadowFormData.pages[pageNumber].items[questionNumber]}/>
                <div className="flex flex-row justify-between">
                    <CommonButton onClick={previousQuestion} text={"Назад"} />
                    <CommonButton onClick={() => sayTheThing('Thing')} text={"Повторить"} />
                    <AccentButton disabled={!isValid} onClick={nextQuestion} text={"Вперед"} />
                </div>
                <div className="flex flex-row justify-between h-8 text-[#26262699]">
                    <div>Страница: {pageNumber+1}</div>
                    <div>{questionNumber+1}/{props.shadowFormData.pages[pageNumber].items.length}</div>
                </div>
            </div>
        </div>
    )
}

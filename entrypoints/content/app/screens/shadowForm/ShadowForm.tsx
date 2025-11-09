import "@/assets/tailwind.css";
import { iShadowFormData } from "../../App";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";

interface iShadowFormProps {
    shadowFormData: iShadowFormData
}

export default function ShadowForm(props: iShadowFormProps) {
    const [ questionNumber, setQuestionNumber ] = useState(0)
    const [ pageNumber, setPageNumber ] = useState(0)

    const nextQuestion = () => {
        const maxPages = props.shadowFormData.pages.length
        if (pageNumber == maxPages && questionNumber == props.shadowFormData.pages[maxPages].items.length) {
            console.log('Should be Impossible!')
            console.log(pageNumber, ' out of ', maxPages)
        } else if (pageNumber == maxPages && questionNumber == props.shadowFormData.pages[maxPages].items.length-1) {
            console.log('It was the final questionCleaning Up!')
        } else if (questionNumber == props.shadowFormData.pages[pageNumber].items.length) {
            setPageNumber(pageNumber+1)
            setQuestionNumber(0)
        } else {
            setQuestionNumber(questionNumber+1)
        }
    }

    return (
        <div className="flex flex-col items-center ">
            <h1 className="text-5xl">{props.shadowFormData.name}</h1>
            <div className="w-3xl h-100 border border-[#E5E5E5] rounded-3xl flex flex-col p-6">
                <h2 className="text-4xl">ID формы: {props.shadowFormData.id}</h2>
                <div className="flex flex-row justify-between">
                    <AccentButton onClick={nextQuestion} text={"Вперед"} />
                    <CommonButton onClick={() => {console.log('Click! PLAYING SMTHNG!')}} text={"Повторить"} />
                    <CommonButton onClick={() => {console.log('Click! Previous!')}} text={"Назад"} />
                </div>
                <div className="flex flex-row justify-between h-8 text-[#26262699]">
                    <div>Страница: {pageNumber}</div>
                    <div>{questionNumber+1}/{props.shadowFormData.pages[pageNumber].items.length}</div>
                </div>
            </div>
        </div>
    )
}

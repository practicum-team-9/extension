import "@/assets/tailwind.css";
import { iShadowFormData } from "../../App";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";

interface iShadowFormProps {
    shadowFormData: iShadowFormData
}

export default function ShadowForm(props: iShadowFormProps) {
    const [ questionNumber, setQuestionNumber ] = useState(0)

    return (
        <div>
            <h1 className="text-5xl">{props.shadowFormData.name}</h1>
            <div className="w-2xl h-100 border border-[#E5E5E5] rounded-2xl">
                <h2 className="text-4xl">ID формы: {props.shadowFormData.id}</h2>
                <div className="flex flex-row justify-between">
                    <AccentButton onClick={() => {console.log('Click! Next!')}} text={"Вперед"} />
                    <CommonButton onClick={() => {console.log('Click! PLAYING SMTHNG!')}} text={"Повторить"} />
                    <CommonButton onClick={() => {console.log('Click! Previous!')}} text={"Назад"} />
                </div>
                <div>{questionNumber}</div>
            </div>
        </div>
    )
}

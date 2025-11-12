import "@/assets/tailwind.css";
import WideBtn from "../../components/buttons/btnContainers/WideBtn";
import CommonBtn from "../../components/buttons/btnContainers/CommonBtn";
import CommonButton from "../../components/buttons/CommonButton";
import AccentButton from "../../components/buttons/AccentButton";


interface iFinalScreenProps {
    formName: string;
    doItAgain: () => void
}

export default function FinalScreen(props: iFinalScreenProps) {
    return (
        <div className="gap-4 flex flex-col w-full items-center">
            <h1 className="text-5xl text-center mb-6">{props.formName}</h1>
            <div className="w-3xl h-100 border border-[#E5E5E5] rounded-3xl flex flex-col p-6 justify-around items-center">
                <div>
                    <h2 className="text-5xl">Спасибо!</h2>
                    <div className="text-gray-400 text-2xl ">Ваш ответ записан</div>
                </div>
                <div className="flex flex-row justify-around gap-10 ">
                    <WideBtn>
                        <CommonButton onClick={() => props.doItAgain()} text={"На главную! "} />
                    </WideBtn>
                    <WideBtn>
                        <AccentButton onClick={() => props.doItAgain()} text={"Начать с начала!"} />
                    </WideBtn>
                </div>
            </div>
        </div>
    )
}

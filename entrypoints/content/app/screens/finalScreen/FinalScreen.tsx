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
        <div className="flex flex-col items-center ">
            <h1 className="text-5xl text-center mb-6">{props.formName}</h1>
            <div className="w-3xl h-100 border border-[#E5E5E5] rounded-3xl flex flex-col p-6 justify-between">
                <h2 className="text-3xl">Спасибо!</h2>
                <div>Ваш ответ записан</div>
                <div className="flex flex-row justify-around">
                    <CommonBtn isAccent={false}>
                        <CommonButton onClick={() => props.doItAgain()} text={"На главную! "} />
                    </CommonBtn>
                    <WideBtn>
                        <AccentButton onClick={() => props.doItAgain()} text={"Заполнить форму еще раз!"} />
                    </WideBtn>
                </div>
            </div>
        </div>
    )
}

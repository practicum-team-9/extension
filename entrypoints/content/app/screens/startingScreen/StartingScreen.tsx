import "@/assets/tailwind.css";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";
import Modal from "@/entrypoints/content/app/components/modal/Modal";

interface iStartingScreenProps {
    isVisible: boolean,
    startInDOM: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startInShadowForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startWithout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StartingScreen(props: iStartingScreenProps) {
    return (
        <div className="gap-4 flex flex-col w-full items-center">
            <h1 className="text-5xl">YaForms Accessibility</h1>
            <AccentButton text='Начать' onClick={props.startInDOM}/>
            <CommonButton text='Закрыть' onClick={props.startWithout}/>
            <AccentButton text='Начать в тени' onClick={props.startInShadowForm}/>
        </div>
    )
}

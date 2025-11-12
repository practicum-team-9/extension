import "@/assets/tailwind.css";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";
import MenuBtn from "../../components/buttons/btnContainers/MenuBtn";

interface iStartingScreenProps {
    isVisible: boolean,
    startInDOM: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startInShadowForm: (event: React.MouseEvent<HTMLButtonElement>) => void;
    startWithout: (event: React.MouseEvent<HTMLButtonElement>) => void;
    showTheFinalScreen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StartingScreen(props: iStartingScreenProps) {
    return (
        <div className="gap-4 flex flex-col w-full items-center">
            <h1 className="text-5xl">YaForms Accessibility</h1>
            <MenuBtn>
                <AccentButton text='Начать' onClick={props.startInShadowForm} />
            </MenuBtn>
            <MenuBtn>
                <CommonButton text='Закрыть' onClick={props.startWithout}/>
            </MenuBtn>
            <MenuBtn>
                <CommonButton text='Начать (Устаревшее)' onClick={props.startInDOM}/>
            </MenuBtn>
            <MenuBtn>
                <CommonButton text='Показать последний' onClick={props.showTheFinalScreen}/>
            </MenuBtn>
        </div>
    )
}

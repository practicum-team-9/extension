import "@/assets/tailwind.css";
import CommonButton from "../../components/buttons/CommonButton";
import MenuBtn from "../../components/buttons/btnContainers/MenuBtn";

interface iErrorScreenProps {
    startWithout: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ErrorScreen(props: iErrorScreenProps) {
    return (
        <div className="gap-4 flex flex-col w-full items-center">
            <h1 className="text-5xl">YaForms Accessibility</h1>
            <h2>Не удалось загрузить данные</h2>
            <MenuBtn>
                <CommonButton text='Закрыть' onClick={props.startWithout}/>
            </MenuBtn>
        </div>
    )
}

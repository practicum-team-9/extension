import "@/assets/tailwind.css";
import mainLogo from "@/assets/logo48.png";

export default function Logo() {
    return (
        <div className="h-[48px] w-[48px]">
            <img alt="Логотип расширения" src={mainLogo}/>
        </div>
    )
}
import "@/assets/tailwind.css";
import KillSwitch from "../killSwitch/KillSwitch";

export default function Header() {
    return (
        <div className="w-[424px] h-[48px] flex justify-around">
            <div className="w-[48px] h-[48px] text-4xl">👁️</div>
            <h1 className='text-2xl'>YaForms accessibility</h1>
            <KillSwitch />
        </div>
    )
}
import FancyToggle from "../fancyToggle/FancyToggle"
import "@/assets/tailwind.css";
import Header from "../header/Header";

export default function Popup() {
    return (
        <div className="w-[500px] h-[300px] p-6 flex flex-col gap-6 rounded-5xl">
            <Header />
            <FancyToggle />
            <FancyToggle />
        </div>
    )
}
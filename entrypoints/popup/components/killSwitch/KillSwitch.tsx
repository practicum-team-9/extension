import "@/assets/tailwind.css";

export default function KillSwitch() {
    const [isExtensionOn, setIsExtensionOn] = useState(true)
    const toggleOnStyle = "bg-blue-300 flex w-[64px] h-[36px] items-center rounded-full justify-start p-1";
    const toggleOffStyle = "bg-gray-300 flex w-[64px] h-[36px] items-center rounded-full justify-end p-1";

    return (
        <div className={isExtensionOn ? toggleOnStyle : toggleOffStyle} onClick={() => {
            isExtensionOn ? setIsExtensionOn(false) : setIsExtensionOn(true);
        }}>
            <div className="bg-white w-[28px] h-[28px] rounded-full">
            </div>
        </div>
    )
}
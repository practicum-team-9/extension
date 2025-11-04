import "@/assets/tailwind.css";

export default function FancyToggle() {
    const [isOn, setIsOn] = useState(true)
    const toggleOnStyle = "bg-blue-500 w-[50%] h-full rounded-2xl flex items-center p-2 gap-2"
    const toggleOffStyle = "bg-gray-500 w-[50%] h-full rounded-2xl flex items-center p-2 gap-2"


    return (
        <div className="bg-gray-500 flex w-[364px] h-[64px] justify-between items-center rounded-2xl" onClick={() => {
            isOn ? setIsOn(false) : setIsOn(true);
        }}>
            <div className={isOn ? toggleOnStyle : toggleOffStyle}>
                <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full">🔊</div>
                <div className="text-sm">Включить</div>
            </div>
            <div className={isOn ? toggleOffStyle : toggleOnStyle}>
                <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full">🔈</div>
                <div className="text-sm">Выключить</div>
            </div>
        </div>
    )
}
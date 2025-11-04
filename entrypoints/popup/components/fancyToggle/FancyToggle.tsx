import "@/assets/tailwind.css";

// TO DO: 
// REPLACE EMOJIs WITH IMGs
// Replace alerts with messaging to the shadow DOM


interface fancyToggleProps {
    isOnEmoji: string;
    isOnText: string;
    isOffEmoji: string;
    isOffText: string;
    isOnMessage: string;
    isOffMessage: string;
}

export default function FancyToggle(props: fancyToggleProps) {
    const [isOn, setIsOn] = useState(true)
    const toggleOnStyle = "bg-blue-500 w-[50%] h-full rounded-2xl flex items-center p-2 gap-2"
    const toggleOffStyle = "bg-gray-500 w-[50%] h-full rounded-2xl flex items-center p-2 gap-2"


    return (
        <div className="bg-gray-500 flex w-[364px] h-[64px] justify-between items-center rounded-2xl" onClick={() => {
            isOn ? setIsOn(false) : setIsOn(true);
            isOn ? alert(props.isOffMessage) : alert(props.isOnMessage);
        }}>
            <div className={isOn ? toggleOnStyle : toggleOffStyle}>
                <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full text-center justify-center">{props.isOnEmoji}</div>
                <div className="text-sm">{props.isOnText}</div>
            </div>
            <div className={isOn ? toggleOffStyle : toggleOnStyle}>
                <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full text-center justify-center">{props.isOffEmoji}</div>
                <div className="text-sm">{props.isOffText}</div>
            </div>
        </div>
    )
}
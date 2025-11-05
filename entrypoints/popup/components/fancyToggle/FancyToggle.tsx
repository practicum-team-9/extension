import "@/assets/tailwind.css";

// TO DO: 
// REPLACE EMOJIs WITH IMGs
// Replace alerts with messaging to the shadow DOM


interface fancyToggleProps {
    isDisabled?: boolean;
    isChecked: boolean;
    name: string;
    isOnEmoji: string;
    isOnText: string;
    isOnMessage: string;
    isOffEmoji: string;
    isOffText: string;
    isOffMessage: string;
    onChange: (e:any) => void;
}

export default function FancyToggle(props: fancyToggleProps) {
    return (
        <label className="inline-flex w-[364px] h-[64px] justify-between items-center rounded-2xl cursor-pointer">
            <input disabled={props.isDisabled} type="checkbox" checked={props.isChecked} value="" className="sr-only peer" name={props.name} onChange={props.onChange} />
            <div className="relative w-full h-full bg-[#E5E5E5] peer-focus:outline-none rounded-2xl peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:bg-[#89A7FF] after:rounded-2xl after:h-full after:w-[50%] after:transition-all peer-checked:after:bg-[#89A7FF]">
                <div className="absolute z-10 top-2 left-4 flex items-center gap-2">                
                    <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full text-center justify-center">{props.isOnEmoji}</div>
                    <div className="text-sm">{props.isOnText}</div>
                </div>
                <div className="absolute z-10 top-2 right-4 flex items-center gap-2">                
                    <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full text-center justify-center">{props.isOffEmoji}</div>
                    <div className="text-sm">{props.isOffText}</div>
                </div>
            </div>
        </label>
    )
}
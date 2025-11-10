import "@/assets/tailwind.css";

export interface iButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean,
    text: string;
}

export default function AccentButton(props: iButtonProps) {

    return (
        <button
        disabled={props.disabled}
        onClick={props.onClick} 
        className="text-3xl  pt-2 pb-2 pl-4 pr-4 text-center justify-center border rounded-2xl p-1 min-h-[64px] self-center cursor-pointer  
        bg-black text-white border-black  
        hover:border-[#262626] hover:bg-[#262626] 
        focus:bg-[#262626]/85
        active:bg-[#FFFFFF] active:border-[#E5E5E5] active:text-[#E5E5E5]
        disabled:bg-[#E5E5E5] disabled:border-[#E5E5E5] "
        >
            {props.text}
        </button>
    )
}

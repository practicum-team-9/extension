import "@/assets/tailwind.css";

export interface iButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean,
    text: string;
}

export default function CommonButton(props: iButtonProps) {

    return (
        <button onClick={props.onClick} 
        disabled={props.disabled}
        type="button" 
        className="text-3xl pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl w-full h-full p-1 min-h-[64px] self-center cursor-pointer border 
        bg-white text-black border-black
        hover:bg-[#E5E5E5] hover:border-[#E5E5E5]
        focus:bg-[#E5E5E5] focus:border-black
        active:bg-[#FFFFFF] active:border-[#E5E5E5] active:text-[#E5E5E5]
        disabled:bg-[#E5E5E5] disabled:border-[#E5E5E5] disabled:text-white
        dark:bg-[#262626] dark:text-white dark:border-white
        dark:hover:bg-black dark:hover:border-black
        dark:focus:bg-black dark:focus:border-white    
        dark:active:bg-black dark:active:border-[#262626] dark:active:text-[#E5E5E5]
        dark:disabled:bg-[#262626] dark:disabled:border-[#4D4D4D] dark:disabled:text-[#4D4D4D]"
        >
            {props.text}
        </button>
    )
}

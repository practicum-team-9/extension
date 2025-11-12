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
        className="text-3xl  p-2 text-center w-full h-full justify-center border rounded-2xl min-h-[64px] self-center cursor-pointer  
        bg-black text-white border-black  
        hover:border-[#262626] hover:bg-[#262626] 
        focus:bg-[#262626]/85
        active:bg-[#FFFFFF] active:border-[#E5E5E5] active:text-[#E5E5E5]
        disabled:bg-[#E5E5E5] disabled:border-[#E5E5E5]
        dark:bg-[#4b71d6] dark:text-white dark:border-[#4b71d6]
        dark:hover:bg-[#638fff] dark:hover:border-[#638fff]
        dark:focus:bg-[#638fff] dark:focus:border-[#4b71d6]            
        dark:active:bg-[#4D4D4D] dark:active:border-[#4D4D4D] dark:active:text-[#E5E5E5]
        dark:disabled:bg-[#262626] dark:disabled:border-[#4D4D4D] dark:disabled:text-[#4D4D4D]"
        >
            {props.text}
        </button>
    )
}

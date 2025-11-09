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
        className="text-3xl bg-black text-white pt-2 pb-2 pl-4 pr-4 text-center justify-center border border-black rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer hover:border-[#262626] hover:bg-[#262626] focus:bg-[#262626]/85"
        >
            {props.text}
        </button>
    )
}

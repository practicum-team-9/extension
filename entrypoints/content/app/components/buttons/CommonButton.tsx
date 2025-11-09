import "@/assets/tailwind.css";

export interface iButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
}

export default function CommonButton(props: iButtonProps) {

    return (
        <button onClick={props.onClick} 
        type="button" 
        className="text-3xl bg-white text-black pt-2 pb-2 pl-4 pr-4 text-center justify-center rounded-2xl w-[50%] p-1 min-h-[64px] self-center cursor-pointer border border-black"
        >
            {props.text}
        </button>
    )
}

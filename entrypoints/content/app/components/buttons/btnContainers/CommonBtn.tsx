import "@/assets/tailwind.css";

export interface iCmnBtn {
    isAccent?: boolean
    children: React.ReactNode
}

export default function MenuBtn(props: iCmnBtn) {
    return (
        <div className={props.isAccent ? 
            "w-[204px] h-[76px]" :
            "w-[180px] h-[76px]"}>
            {props.children}
        </div>
    )
}

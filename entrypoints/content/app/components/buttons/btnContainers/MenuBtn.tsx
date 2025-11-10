import "@/assets/tailwind.css";

export interface iMenuBtn {
    children: React.ReactNode
}

export default function MenuBtn(props: iMenuBtn) {
    return (
        <div className="w-[50%] h-[76px]">
            {props.children}
        </div>
    )
}

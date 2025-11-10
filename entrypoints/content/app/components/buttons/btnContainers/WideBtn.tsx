import "@/assets/tailwind.css";

export interface iWdBtn {
    children: React.ReactNode
}

export default function WideBtn(props: iWdBtn) {
    return (
        <div className="w-[265px] h-[76px]">
            {props.children}
        </div>
    )
}
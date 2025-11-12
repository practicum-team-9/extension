import "@/assets/tailwind.css";
import { ReactNode } from "react";

interface iModal {
    isVisible: boolean,
    children?: ReactNode;
}

export default function Modal(props: iModal) {
    return (
    <div className={props.isVisible ? 
        'visible fixed top-0 bottom-0 right-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-900/50' :
        'hidden absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full justify-center items-center bg-gray-900/50'
    }>
        <div className="rounded-3xl flex flex-col p-6 justify-center items-center w-4xl h-200
        bg-white text-black
        dark:bg-[#262626] dark:text-white">
            {props.children}
        </div>
    </div>
)
    
}

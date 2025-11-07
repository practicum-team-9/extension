import "@/assets/tailwind.css";
import { ReactNode } from "react";

interface iModal {
    isVisible: boolean,
    children?: ReactNode;
}

export default function Modal(props: iModal) {
    return (
    <div className={props.isVisible ? 'visible absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-900/50' :
        'hidden absolute top-0 bottom-0 right-0 left-0 z-50 h-full w-full justify-center items-center bg-gray-900/50'
    }>
        <div className="bg-white rounded-3xl flex flex-col p-6 justify-center items-center w-2xl h-100 gap-4">
            {props.children}
        </div>
    </div>
)
    
}

import "@/assets/tailwind.css";
import { ReactNode } from "react";

interface fancyToggleProps {
    isDisabled?: boolean;
    isChecked: boolean;
    name: string;
    children?: ReactNode;
    onChange: (e:any) => void;
}

export default function FancyToggle(props: fancyToggleProps) {
    return (
        <label className="inline-flex w-[364px] h-[64px] justify-between items-center rounded-2xl cursor-pointer">
            <input disabled={props.isDisabled} type="checkbox" checked={props.isChecked } value="" className="sr-only peer" name={props.name} onChange={props.onChange} />
            <div className="relative w-full h-full peer-focus:outline-none rounded-2xl peer after:right-0 peer-checked:after:-translate-x-full rtl:peer-checked:after:translate-x-full after:content-[''] after:absolute after:rounded-2xl after:h-full after:w-[50%] after:transition-all
            bg-[#E5E5E5]  after:bg-[#89A7FF] peer-checked:after:bg-[#89A7FF]
            dark:bg-gray-500 after:dark:bg-[#4b71d6] peer-checked:after:dark:bg-[#4b71d6]
            peer-disabled:after:bg-[#E5E5E5] dark:peer-disabled:after:bg-gray-500">
               {props.children}
            </div>
        </label>
    )
}
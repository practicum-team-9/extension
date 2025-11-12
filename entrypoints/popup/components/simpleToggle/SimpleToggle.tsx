import "@/assets/tailwind.css";


interface ISimpleToggleProps {
    name: string;
    isChecked: boolean;
    onChange: (e:any) => void;
}

export default function SimpleToggle(props: ISimpleToggleProps) {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={props.isChecked} value="" className="sr-only peer" name={props.name} onChange={props.onChange} />
            <div className="relative w-11 h-6  peer-focus:outline-none rounded-full 
            bg-[#E5E5E5] peer-checked:bg-[#89A7FF] after:bg-white
            dark:bg-gray-500 peer-checked:dark:bg-[#4b71d6] after:dark:bg-white
            peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px]  after:rounded-full after:h-5 after:w-5 after:transition-all "></div>
        </label>
    )
}
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
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#89A7FF]"></div>
        </label>
    )
}
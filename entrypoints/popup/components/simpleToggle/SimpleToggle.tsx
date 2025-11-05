import "@/assets/tailwind.css";

export default function SimpleToggle() {
    // const [isExtensionOn, setIsExtensionOn] = useState(true)
    // const toggleOnStyle = "bg-blue-300 flex w-[64px] h-[36px] items-center rounded-full justify-start p-1";
    // const toggleOffStyle = "bg-gray-300 flex w-[64px] h-[36px] items-center rounded-full justify-end p-1";
    //
    // return (
    //     <div className={isExtensionOn ? toggleOnStyle : toggleOffStyle} onClick={() => {
    //         isExtensionOn ? setIsExtensionOn(false) : setIsExtensionOn(true);
    //     }}>
    //         <div className="bg-white w-[28px] h-[28px] rounded-full">
    //         </div>
    //     </div>
    // )

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#89A7FF]"></div>
        </label>
    )
}
import "@/assets/tailwind.css";
import Logo from "../logo/Logo";

export default function Header() {
    return (
        <div className="w-full p-2.5 flex flex-row justify-between items-center border-b-2 border-b-[#E5E5E5]">
            <div> </div>
            <div> </div>
             <div className="flex flex-ro gap-4 justify-center items-center">
                <Logo />
                <div className="text-xl">YaForms accessibility</div>
            </div>
        </div>
       
)
    
}

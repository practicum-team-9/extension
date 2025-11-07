import "@/assets/tailwind.css";

interface IThemeToggle {
    textOn: string;
    textOff: string;
}

export default function ThemeToggle(props: IThemeToggle) {
    return (
        <> 
            <div className="absolute z-10 top-2 left-4 flex items-center gap-2">                
                    <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full p-0.5">
                        ☀️
                    </div>
                    <div className="text-sm">{props.textOn}</div>
                </div>
                <div className="absolute z-10 top-2 right-4 flex items-center gap-2">                
                    <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full p-0.5">
                        🌒
                    </div>
                    <div className="text-sm">{props.textOff}</div>
                </div>
        </>
    )
}
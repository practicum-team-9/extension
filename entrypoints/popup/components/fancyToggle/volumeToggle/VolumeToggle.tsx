import "@/assets/tailwind.css";
import volumeOnImg from "@/assets/volumeOn.svg";
import volumeOffImg from "@/assets/volumeOff.svg";

interface IVolumeToggleProps {
    textOn: string;
    textOff: string;
}

export default function VolumeToggle(props: IVolumeToggleProps) {
    return (
        <> 
            <div className="absolute z-10 top-2 left-4 flex items-center gap-2">                
                    <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full p-2.5">
                        <img src={volumeOnImg}/>
                    </div>
                    <div className="text-sm">{props.textOn}</div>
                </div>
                <div className="absolute z-10 top-2 right-4 flex items-center gap-2">                
                    <div className="w-[48px] h-[48px] text-4xl bg-white rounded-full p-2.5">
                        <img src={volumeOffImg}/>
                    </div>
                    <div className="text-sm">{props.textOff}</div>
                </div>
        </>
    )
}
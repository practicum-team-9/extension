import "@/assets/tailwind.css";
import { iShadowFormData } from "../../App";

interface iShadowFormProps {
    shadowFormData: iShadowFormData
}

export default function ShadowForm(props: iShadowFormProps) {
    return (
        <div>
            <h1 className="text-5xl">{props.shadowFormData.name}</h1>
        </div>
    )
}

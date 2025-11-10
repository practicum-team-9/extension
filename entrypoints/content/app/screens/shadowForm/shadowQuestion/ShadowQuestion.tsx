import "@/assets/tailwind.css";
import { iShadowFormPageItemsData } from "../../../App";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { useThingsToSay } from "@/entrypoints/hooks/useSettingsData/useThingsToSay";
import { sayTheThing } from "@/entrypoints/content/scripts/speechScripts/sayTheThing";
import { iShadowFormPageItemsFormatted } from "../ShadowForm";

interface iShadowQuestionProps {
    shadowQuestionData: iShadowFormPageItemsFormatted
}


export default function ShadowQuestion(props: iShadowQuestionProps) {
    const { hidden, id, label, multiline, type, widget, validations, validationArray, questionType, speech  } = props.shadowQuestionData


    if (questionType === 'date') {
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='date' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2"/>
            </>
        )
    } else if (questionType === 'dropdown') {
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='dropdown' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] p-2"/>
            </>
        )
    } else if (questionType === 'checkbox') {
        return (
            <div className="flex flex-row w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2">
                <input name={id} id={id} type='checkbox' required={validationArray.includes('required')} className="flex flex-row w-12 h-12 rounded-md pt-4 pb-4 pl-2 pr-2"/>
                <h2 className="text-2xl">{label}</h2>
            </div>
        )
    } 
    else if (questionType === 'email') {
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='email' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" />
            </>
        )
    } 
    else if (questionType === 'tel') {
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='tel' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" />
            </>
        )          
    } 
    else if (type === 'string') {
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='text' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" />
            </>
        )
    }    
}

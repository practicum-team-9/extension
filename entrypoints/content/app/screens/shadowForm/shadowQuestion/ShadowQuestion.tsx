import "@/assets/tailwind.css";
import { iShadowFormPageItemsData } from "../../../App";
import { HTMLInputTypeAttribute } from "react";

interface iShadowQuestionProps {
    shadowQuestionData: iShadowFormPageItemsData
}

export default function ShadowQuestion(props: iShadowQuestionProps) {
    const { hidden, id, label, multiline, type, widget, validations } = props.shadowQuestionData
    const [ questionType, setQuestionType ] = useState<HTMLInputTypeAttribute>('text')

    var validationsArray: string[] = []
        
    validations?.forEach((validation) => {
        validationsArray.push(validation.type)
    })

    if (type === 'date') {
        console.log('date')
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='date' required={validationsArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2"/>
            </>
        )
    } else if (type === 'enum') {
        console.log('dropdown')
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='dropdown' required={validationsArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] p-2"/>
            </>
        )
    } else if (type === 'boolean') {
        console.log('checkbox')
        return (
            <div className="flex flex-row w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2">
                <input name={id} id={id} type='checkbox' required={validationsArray.includes('required')} className="flex flex-row w-12 h-12 rounded-md pt-4 pb-4 pl-2 pr-2"/>
                <h2 className="text-2xl">{label}</h2>
            </div>
        )
    } 
    else if (type === 'string' && validationsArray.includes('email')) {
        console.log('email')            
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='email' required={validationsArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" />
            </>
        )
    } 
    else if (type === 'string' && validationsArray.includes('phone')) {
        console.log('tel')  
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='tel' required={validationsArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" />
            </>
        )          
    } 
    else if (type === 'string') {
        console.log('text')
        return (
            <>
                <h2 className="text-3xl">{label}</h2>
                <input name={id} id={id} type='text' required={validationsArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" />
            </>
        )
    }    
}

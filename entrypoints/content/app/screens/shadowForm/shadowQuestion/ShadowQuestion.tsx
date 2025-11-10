import "@/assets/tailwind.css";
import { iShadowFormPageItemsData } from "../../../App";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { useThingsToSay } from "@/entrypoints/hooks/useSettingsData/useThingsToSay";
import { sayTheThing } from "@/entrypoints/content/scripts/speechScripts/sayTheThing";
import { iShadowFormPageItemsFormatted } from "../ShadowForm";

interface iShadowQuestionProps {
    isPlaying?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    shadowQuestionData: iShadowFormPageItemsFormatted
}


export default function ShadowQuestion(props: iShadowQuestionProps) {
    const { hidden, id, label, multiline, type, widget, validations, validationArray, questionType, speech, items } = props.shadowQuestionData
    const inputRef = useRef<HTMLInputElement>(null) 
    const textRef = useRef<HTMLTextAreaElement>(null) 
    const selectRef = useRef<HTMLSelectElement>(null) 

    useEffect(() => {
        //console.log('Locking in... ')
        if (inputRef.current) {
            inputRef.current.focus();
        } else if (textRef.current) {
            textRef.current.focus();
        } else if (selectRef.current) {
            selectRef.current.focus();
        }
    }, [props.shadowQuestionData])

    if (questionType === 'date') {
        return (
            <>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-3xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-3xl">{label}</label>
                </div>
                <input onChange={props.onChange} name={id} id={id} type='date' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef}/>
            </>
        )
    } else if (questionType === 'dropdown') {
        return (
            <div>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-3xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-3xl">{label}</label>
                </div>
                <select onChange={props.onChange} name={id} id={id} className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={selectRef}>
                    <option selected disabled value='Не выбрано'>Выберите значение!</option>
                    {
                        items?.map((item, index) => (
                        <option key={index} id={item.id} value={item.label}>{item.label}</option>
                    ))
                    }
                </select>
            </div>
        )
    } else if (questionType === 'checkbox') {
        return (
            <div className="flex flex-row w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2">
                <input onChange={props.onChange} name={id} id={id} type='checkbox' required={validationArray.includes('required')} className="flex flex-row w-12 h-12 rounded-md pt-4 pb-4 pl-2 pr-2" ref={inputRef}/>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-2xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-2xl">{label}</label>
                </div>
            </div>
        )
    } else if (questionType === 'email') {
        return (
            <>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-3xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-3xl">{label}</label>
                </div>
                <input onChange={props.onChange} name={id} id={id} type='email' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef} />
            </>
        )
    } else if (questionType === 'tel') {
        return (
            <>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-3xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-3xl">{label}</label>
                </div>
                <input onChange={props.onChange} name={id} id={id} type='tel' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef} />
            </>
        )          
    } else if (type === 'string' && multiline) {
        return (
            <>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-3xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-3xl">{label}</label>
                </div>
                <textarea onChange={props.onChange} name={id} id={id} rows={6} required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={textRef} />
            </>
        )
    } else if (type === 'string') {
        return (
            <>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-3xl">
                        *
                    </div> : null}
                    <label htmlFor={id} className="text-3xl">{label}</label>
                </div>
                <input onChange={props.onChange} name={id} id={id} type='text' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef}/>
            </>
        )
    }    
}

import "@/assets/tailwind.css";
import { iShadowFormPageItemsFormatted, iSubmitAnswers } from "../ShadowForm";

interface iShadowQuestionProps {
    isPlaying?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
    shadowQuestionData: iShadowFormPageItemsFormatted,
    formState: iSubmitAnswers,
}


export default function ShadowQuestion(props: iShadowQuestionProps) {
    const { hidden, id, label, multiline, type, widget, validations, validationArray, questionType, speech, items, comment } = props.shadowQuestionData
    const inputRef = useRef<HTMLInputElement>(null) 
    const textRef = useRef<HTMLTextAreaElement>(null) 
    const selectRef = useRef<HTMLSelectElement>(null) 

    useEffect(() => {
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
                    { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                </div>
                <input value={props.formState[id] ? props.formState[id].value : '2000-01-01'} onChange={props.onChange} name={id} id={id} type='date' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef}/>
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id} className="text-3xl">{label}</label>
                        { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                    </div>
                </div>
                <select value={props.formState[id] ? props.formState[id].value : 'Не выбрано'} onChange={props.onChange} name={id} id={id} className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={selectRef}>
                    <option disabled value='Не выбрано'>Выберите значение!</option>
                    {
                        items?.map((item, index) => (
                        <option key={index} id={item.id} value={item.label} className="dark:bg-[#262626]">{item.label}</option>
                    ))
                    }
                </select>
            </div>
        )
    } else if (questionType === 'checkbox') {
        return (
            <div className="flex flex-row w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2">
                <input checked={props.formState[id] ? props.formState[id].checked : false} onChange={props.onChange} name={id} id={id} type='checkbox' required={validationArray.includes('required')} className="flex flex-row w-12 h-12 rounded-md pt-4 pb-4 pl-2 pr-2" ref={inputRef}/>
                <div className="flex flex-row ">                    
                    {props.shadowQuestionData.validationArray.includes('required') ? 
                    <div className="text-red-600 text-2xl">
                        *
                    </div> : null}
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id} className="text-3xl">{label}</label>
                        { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                    </div>
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id} className="text-3xl">{label}</label>
                        { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                    </div>
                </div>
                <input value={props.formState[id] ? props.formState[id].value : ' '} onChange={props.onChange} name={id} id={id} type='email' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef} />
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id} className="text-3xl">{label}</label>
                        { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                    </div>
                </div>
                <input value={props.formState[id] ? props.formState[id].value : ' '} onChange={props.onChange} name={id} id={id} type='tel' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef} />
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id} className="text-3xl">{label}</label>
                        { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                    </div>
                </div>
                <textarea value={props.formState[id] ? props.formState[id].value : ' '} onChange={props.onChange} name={id} id={id} rows={6} required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={textRef} />
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor={id} className="text-3xl">{label}</label>
                        { comment ? <span className="text-[#262626]/60 text-xl">{comment}</span> : null}
                    </div>
                </div>
                <input value={props.formState[id] ? props.formState[id].value : ' '} onChange={props.onChange} name={id} id={id} type='text' required={validationArray.includes('required') } className="text-3xl w-full rounded-md border-2 border-[#E5E5E5] pt-4 pb-4 pl-2 pr-2" ref={inputRef}/>
            </>
        )
    }    
}

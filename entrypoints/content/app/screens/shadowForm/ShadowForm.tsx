import "@/assets/tailwind.css";
import { iShadowFormData } from "../../App";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";
import ShadowQuestion from "./shadowQuestion/ShadowQuestion";
import { sayTheThing } from "@/entrypoints/content/scripts/speechScripts/sayTheThing";
import { useThingsToSay } from "@/entrypoints/hooks/useSettingsData/useThingsToSay";
import { HTMLInputTypeAttribute } from "react";

interface iShadowFormProps {
    shadowFormData: iShadowFormData
}

// To submit the form
interface iSubmitAnswers {
    [key: string] : string[],
}


// Formatting data to work with
export interface iShadowFormPageItemsFormatted {
    hidden: boolean,
    id: string,
    label: string,
    multiline: boolean,
    type: string,
    widget?: boolean,
    validations?: {type: string}[],
    validationArray: string[],
    questionType: HTMLInputTypeAttribute,
    speech: string
}

export interface iShadowFormPagesFormatted {
    items: iShadowFormPageItemsFormatted[]
}

export interface iShadowFormFormatted {
    footer: boolean,
    id: string,
    iFrame: boolean,
    name: string,
    pages: iShadowFormPagesFormatted[],
    teaser: boolean,
    texts?: {
        submit?: string,
        back?: string,
        next?: string
    }
}

export default function ShadowForm(props: iShadowFormProps) {
    const [ questionNumber, setQuestionNumber ] = useState(0)
    const [ pageNumber, setPageNumber ] = useState(0)
    const [ isValid, setIsValid ] = useState(true)
    const [ formState, setFormState ] = useState<iSubmitAnswers>()
    const [ formattedData, setFormattedData ] = useState<iShadowFormFormatted>({
        footer: true,
        id: 'Загружаем...',
        iFrame: false,
        name: 'Загружаем...',
        pages: [
            {
               items: [{
                    hidden: false,
                    id: 'Загружаем...',
                    label: 'Загружаем...',
                    multiline: false,
                    type: 'Загружаем...',
                    validationArray: [],
                    questionType: 'text',
                    speech: 'Загружаем...'
                }]
            }
        ],
        teaser: true,
    })

    const nextQuestion = () => {
        const maxPages = props.shadowFormData.pages.length
        console.log('Question N', questionNumber, 'Max Questions: ', props.shadowFormData.pages[pageNumber].items.length )
        console.log('Page N', pageNumber, 'Max Pages: ', props.shadowFormData.pages.length )

        if (pageNumber+1 == maxPages && questionNumber+1 == props.shadowFormData.pages[maxPages-1].items.length) {
            console.log('Should be Impossible!')
            console.log(pageNumber, ' out of ', maxPages)
        } else if (pageNumber+1 == maxPages && questionNumber+1 == props.shadowFormData.pages[maxPages-1].items.length) {
            console.log('It was the final questionCleaning Up!')
        } else if (questionNumber+1 == props.shadowFormData.pages[pageNumber].items.length) {
            console.log('Moving to the next page')
            setPageNumber(pageNumber+1)
            setQuestionNumber(0)
        } else {
            console.log('Next Question!')
            setQuestionNumber(questionNumber+1)
        }
    }

    const previousQuestion = () => {
        const maxPages = props.shadowFormData.pages.length
        console.log('Question N', questionNumber, 'Max Questions: ', props.shadowFormData.pages[pageNumber].items.length )
        console.log('Page N', pageNumber, 'Max Pages: ', props.shadowFormData.pages.length )

        if (pageNumber == 0 && questionNumber == 0) {
            console.log('Should be Impossible!')
        } else if (questionNumber == 0) {
            console.log('Moving to the previous page')
            setPageNumber(pageNumber-1)
            setQuestionNumber(0)
        } else {
            console.log('Previous Question!')
            setQuestionNumber(questionNumber-1)
        }
    }

    useEffect(() => {
        const { pages } = props.shadowFormData
        var itemsArray: iShadowFormPageItemsFormatted[]
        var pagesArray: iShadowFormPagesFormatted[] = []
        var questionType: HTMLInputTypeAttribute
        var validationsArray: string[]
        var speech: string


        pages.forEach((page) => {
            itemsArray = []
            page.items.forEach((item) => {
                validationsArray = []
                speech = ''
                item.validations?.forEach((validation) => {
                    validationsArray.push(validation.type)

                })
                if (validationsArray.includes('required')) {
                    speech += 'Это обязательный вопрос.'
                }
                if (item.type === 'date') {
                    speech += 'Введите дату в формате День Месяц Год.'
                    questionType = 'date'
                } else if (item.type === 'enum') {
                    speech += 'Выберите один вариант из предложенных.'
                    questionType = 'dropdown'
                } else if (item.type === 'boolean') {
                    speech += 'Нажмите поле чтобы подтвердить или снять подтверждение.'
                    questionType = 'checkbox'
                } 
                else if (item.type === 'string' && validationsArray.includes('email')) {
                    speech += 'Введите электронную почту.'
                    questionType = 'email'
                } 
                else if (item.type === 'string' && validationsArray.includes('phone')) {  
                    speech += 'Введите номер телефона.'
                    questionType = 'tel'
                } 
                else if (item.type === 'string') {
                    speech += 'Введите текст в поле.'
                    questionType = 'text'
                }    
                itemsArray.push({
                    ...item,
                    validationArray: validationsArray,
                    questionType: questionType,
                    speech: speech
                })
            })
            pagesArray.push({items: itemsArray})            
        })

        setFormattedData({
            ...props.shadowFormData,
            pages: pagesArray
        })
    }, [props.shadowFormData])

    return (
        <div className="flex flex-col items-center ">
            <h1 className="text-5xl">{props.shadowFormData.name}</h1>
            <div className="w-3xl h-100 border border-[#E5E5E5] rounded-3xl flex flex-col p-6 justify-between">
                <ShadowQuestion shadowQuestionData={formattedData.pages[pageNumber].items[questionNumber]}/>
                <div className="flex flex-row justify-between">
                    <CommonButton onClick={previousQuestion} text={"Назад"} />
                    <CommonButton onClick={() => sayTheThing(formattedData.pages[pageNumber].items[questionNumber].speech)} text={"Повторить"} />
                    <AccentButton disabled={!isValid} onClick={nextQuestion} text={"Вперед"} />
                </div>
                <div className="flex flex-row justify-between h-8 text-[#26262699]">
                    <div>Страница: {pageNumber+1}</div>
                    <div>{questionNumber+1}/{props.shadowFormData.pages[pageNumber].items.length}</div>
                </div>
            </div>
        </div>
    )
}

import "@/assets/tailwind.css";
import { iShadowFormData, iShadowFormDropDownItemsData } from "../../App";
import AccentButton from "../../components/buttons/AccentButton";
import CommonButton from "../../components/buttons/CommonButton";
import ShadowQuestion from "./shadowQuestion/ShadowQuestion";
import { sayTheThing, sayTheThingDelayed } from "@/entrypoints/content/scripts/speechScripts/sayTheThing";
import { HTMLInputTypeAttribute } from "react";
import { getCurrentFormID } from "@/entrypoints/content/scripts/utilityScripts/getCurrentFormID";
import CommonBtn from "../../components/buttons/btnContainers/CommonBtn";

interface iShadowFormProps {
    previousScreen: () => void;
    nextScreen: () => void;
    shadowFormData: iShadowFormData
}

export interface iSubmitAnswers {
    [key: string] : any,
}


export interface iShadowFormPageItemsFormatted {
    hidden: boolean,
    id: string,
    label: string,
    comment?: string,
    multiline: boolean,
    type: string,
    widget?: boolean,
    items?: iShadowFormDropDownItemsData[],
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
    const [ formState, setFormState ] = useState<iSubmitAnswers>({})
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

        if (pageNumber+1 == maxPages && questionNumber+1 == props.shadowFormData.pages[maxPages-1].items.length) {
            submitFormAnsers()
        } else if (questionNumber+1 == props.shadowFormData.pages[pageNumber].items.length) {
            // console.log('Moving to the next page')
            if (formattedData.pages[pageNumber+1].items[0].validationArray?.includes('required')) {
                setIsValid(false)
            }
            // sayTheThingWrapper(formattedData.pages[pageNumber+1].items[0].speech)
            setPageNumber(pageNumber+1)
            setQuestionNumber(0)
        } else {
            if (formattedData.pages[pageNumber].items[questionNumber+1].validationArray?.includes('required')) {
                setIsValid(false)
            }
            // sayTheThingWrapper(formattedData.pages[pageNumber].items[questionNumber+1].speech)
            setQuestionNumber(questionNumber+1)
        }
    }

    const previousQuestion = () => {
        const maxPages = props.shadowFormData.pages.length
        if (pageNumber == 0 && questionNumber == 0) {
            props.previousScreen()
        } else if (questionNumber == 0) {
            // sayTheThingWrapper(formattedData.pages[pageNumber-1].items[0].speech)
            setPageNumber(pageNumber-1)
            setQuestionNumber(0)
            setIsValid(true)
        } else {
            // sayTheThingWrapper(formattedData.pages[pageNumber].items[questionNumber-1].speech)
            setQuestionNumber(questionNumber-1)
            setIsValid(true)
        }
    }

    const repeatItPlease = () => {
        sayTheThingWrapper(formattedData.pages[pageNumber].items[questionNumber].speech)
    }

    const sayTheThingWrapper = (thing: string, delay?: number) => {
        if (delay) {
            sayTheThingDelayed(thing, delay)
        } else {
            sayTheThing(thing)
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {                
            const checked = e.target.checked
            setFormState((prevState: iSubmitAnswers) => ({...prevState, [name]: checked}))            
        } else if (e.target instanceof HTMLSelectElement) {
            const optionId = e.target.options[e.target.selectedIndex].id
            setFormState((prevState: iSubmitAnswers) => ({...prevState, [name]: [optionId]}))
        } else {
            setFormState((prevState: iSubmitAnswers) => ({...prevState, [name]: value}))
        }
        // console.log(formState)
        setIsValid(e.target.checkValidity())
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            if (e.target.checked) {
                sayTheThingWrapper(`Вы отметили поле.`)
            } else {
                sayTheThingWrapper(`Вы сняли отметку.`)
            }
        } else {
            sayTheThingWrapper(`Вы ввели ${value}`)
        }
        // setTimeout(() => {
        //     if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
        //         if (e.target.checked) {
        //             sayTheThingWrapper(`Вы отметили поле.`)
        //         } else {
        //             sayTheThingWrapper(`Вы сняли отметку.`)
        //         }
        //     } else {
        //         sayTheThingWrapper(`Вы ввели ${value}`)
        //     }
        // }, 1000)
    };

    const submitFormAnsers = () => {
        // console.log('Submitting!...')
        // console.log(formState)

        const id = getCurrentFormID()
        const fetchUrl = `https://api.forms.yandex.net/v1/surveys/${id}/form`
        fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        .then(response => response.json())
        .then(data => {
            props.nextScreen()
        })
        .catch(error => console.error('Error:', error));

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
                    speech += 'Это обязательный вопрос\n'
                }
                speech += `${item.label}\n`
                if (item.comment) {
                    speech += `${item.comment}`
                }
                
                if (item.type === 'date') {
                    speech += 'Введите дату в формате День Месяц Год.'
                    questionType = 'date'
                } else if (item.type === 'enum') {
                    speech += 'Выберите один вариант из предложенных: \n'
                    questionType = 'dropdown'
                    item.items?.forEach((dropDownItem) => {
                        speech += `Вариант ${dropDownItem.id}  ${dropDownItem.label} }\n`
                    })
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
        setIsValid(false)
        
    }, [props.shadowFormData])



    useEffect(() => {
        // console.log('On new Question Speech')

        if (formattedData) {
            sayTheThingWrapper(formattedData.pages[pageNumber].items[questionNumber].speech)
            // console.log(formattedData.pages[pageNumber].items[questionNumber].speech)
            }

        const keyboardPressed = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && isValid) {
                //console.log(formattedData)
                nextQuestion()
            }
        }
        document.addEventListener('keydown', keyboardPressed)

        return () => {
            document.removeEventListener('keydown', keyboardPressed)
        }
    }, [formattedData, isValid, pageNumber, questionNumber])

    return (
        <div className="flex flex-col items-center ">
            <h1 className="text-5xl text-center mb-6">{props.shadowFormData.name}</h1>
            <div className="w-3xl h-100 border border-[#E5E5E5] rounded-3xl flex flex-col p-6 justify-between">
                <ShadowQuestion onChange={handleChange} shadowQuestionData={formattedData.pages[pageNumber].items[questionNumber]} formState={formState}/>
                <div className="flex flex-row justify-between">
                    <CommonBtn isAccent={false}>
                        <CommonButton onClick={previousQuestion} text={"Назад"} />
                    </CommonBtn><CommonBtn isAccent={false}>
                        <CommonButton onClick={repeatItPlease} text={"Повторить"} />
                    </CommonBtn>
                    <CommonBtn isAccent={true}>
                        <AccentButton disabled={!isValid} onClick={nextQuestion} text={"Вперед"} />
                    </CommonBtn>
                </div>
                <div className="flex flex-row justify-between h-8 text-[#26262699]">
                    <div>Страница: {pageNumber+1}</div>
                    <div>{questionNumber+1}/{props.shadowFormData.pages[pageNumber].items.length}</div>
                </div>
            </div>
        </div>
    )
}

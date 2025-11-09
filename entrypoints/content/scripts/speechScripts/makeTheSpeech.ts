export interface iMakeTheSpeech {
    isRequired: boolean,
    questionType: string,
    text: string,
}

export const makeTheSpeech = (props: iMakeTheSpeech) => {
    console.log(props.questionType)
    props.text = props.text.replace("*", "");
    props.text = props.text.replace("Обязательное поле", "");
    var speech = "";
    props.isRequired ? speech += "Это обязательный вопрос.\n " : speech += "Это необязательный вопрос.\n "
    switch (props.questionType) {
        case "TextQuestion":
            speech += "Это вопрос со свободным ответом. Введите ответ с клавиатуры. Для подтверждения - нажмите Энтер\n "
            break;
        case "DateQuestion":
            speech += "Это вопрос в формате даты. Введите дату с клавиатуры. Для подтверждения - нажмите Энтер \n ";
            break;
        case "BooleanQuestion":
            speech += "Это закрытый вопрос. Нажмите пробел чтобы изменить значение. Для подтверждения - нажмите Энтер\n ";
            break;
        case "DropdownQuestion":
            speech += "Это вопрос с выпадающим списком. Нажмите пробел чтобы выбрать список и выберите значения в нем и нажмите пробел. Для подтверждения - нажмите Энтер\n ";
            break;
        default: 
            speech += " "
    }

    speech += " " + props.text;

    return speech;
}
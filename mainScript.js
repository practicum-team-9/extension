(() => {
    console.log('Something.. ')
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type } = obj;

        if (type === "newForm") {
            newFormLoaded();
        }
    })
})();

window.onload = function() {
    newFormLoaded()
}

const sayTheThing = (thing) => {
    // Скажи фразу
    console.log(thing)
    var utterance = new SpeechSynthesisUtterance(thing);
    window.speechSynthesis.speak(utterance);

}

const styleBtnAccent = (btn) => {
    if (btn) {
        btn.classList="g-button g-button_view_action g-button_size_xl g-button_pin_round-round g-button_width_auto SurveyPage-Button";
        btn.style.setProperty("--g-button-background-color", '#262626');
        btn.style.setProperty("--g-button-background-color-hover", '#262626D9');
        btn.style.setProperty("--_--height", '76px');
        btn.style.width = '30%';
        btn.style.setProperty("--_--font-size", '24px');
        btn.style.setProperty("--_--padding", '16px');
        btn.style.setProperty("--_--border-width", '2px');
        btn.style.setProperty("--_--border-color", '#262626');
        btn.style.setProperty("--_--focus-outline-color", '#262626');
        btn.style.setProperty("--_--focus-outline-offset", '0px');
        btn.style.color = "#ffffff";
    } 

    return btn;
}

const styleBtn = (btn) => {
    if (btn) {
        btn.classList="g-button g-button_view_action g-button_size_xl g-button_pin_round-round g-button_width_auto SurveyPage-Button";
        btn.style.setProperty("--g-button-background-color", '#FFFFFF');
        btn.style.setProperty("--g-button-background-color-hover", '#E5E5E5');
        btn.style.width = '30%';
        btn.style.setProperty("--_--height", '76px');
        btn.style.setProperty("--_--font-size", '24px');
        btn.style.setProperty("--_--padding", '16px');
        btn.style.setProperty("--_--border-width", '2px');
        btn.style.setProperty("--_--border-color", '#262626');
        btn.style.setProperty("--_--focus-outline-color", '#262626');
        btn.style.setProperty("--_--focus-outline-offset", '0px');
        btn.style.color = "#262626";
    } 
    return btn;
}

const createBtn = (name, type, text) => {
    // Creates and adds style to a button
    var btn = document.createElement('button');
    if (name.endsWith('-NextButton')) {
        btn = styleBtnAccent(btn)
    } else {
        btn = styleBtn(btn)
    }
    btn.id = name;
    btn.type = type;
    btn.textContent = text

    return btn;
}

const showQuestion = (question) => {
    // Поиск частей инпута 
    var { 
        questionId,
        questionType,
        inputField,
        questionTextContent,
        isRequiered
        } = getQuestionElements(question)
    
    var text = makeTheSpeech(isRequiered, questionType, questionTextContent);
    sayTheThing(text)
    showQuestionButtons(questionId);
    question.style.display = "flex";
    inputField.focus();

}

const buttonTypes = ["AlertButton", "NextButton"]

const showQuestionButtons = (questionId) => {
    buttonTypes.forEach((type) => {
        var btn = document.getElementById(questionId + "-" + type)

        btn.style.display = "flex";
    })
}

const hideQuestion = (question) => {
    var { 
        questionId
        } = getQuestionElements(question)
    hideQuestionButtons(questionId);
    question.style.display = "none";
}

const hideButton = (btn) => {
    btn.style.display = "none";
}

const hideQuestionButtons = (questionId) => {
    buttonTypes.forEach((type) => {
        var btn = document.getElementById(questionId + "-" + type)
        if (btn) {
            hideButton(btn);
        };
    })
}

const hideAllQuestions = (questionsArray) => {
    questionsArray.forEach((question, questionIndex) => {
        hideQuestion(question)
    })
}

const getQuestionElements = (question) => {
    var classList = question.classList;
    var questionType = classList[1]
    var inputField = question.querySelectorAll("input")[0] ? question.querySelectorAll("input")[0] : question.querySelectorAll("textarea")[0];
    var questionId = inputField.id ? inputField.id : inputField.name;
    var isRequiered = question.querySelectorAll("[class*='Required']")[0] ? true : false;


    var questionLabel = question.getElementsByClassName("QuestionLabel")[0];
    var questionTextContent = question.textContent;
    if (questionType = "DropdownQuestion") {
        inputField = document.getElementById(questionId);
    }

    return { 
        questionId,
        questionType,
        inputField,
        questionLabel,
        questionTextContent,
        isRequiered
     }
}

const createLogo = () => {
    var header = document.querySelectorAll("header")[0];
    var logoContainer = document.createElement('a');
    logo = document.createElement('img');
    //logo.src = "data:image/png;base64,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";
    logo.src = "data:image/png;base64,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";
    logo.alt = "Логотип расширения";
    logo.id = "extensionLogo";
    var extensionHeader = document.createElement('span');
    extensionHeader.textContent = 'YaForms accessibility';
    var logoContainer = document.createElement('div');

    logoContainer.style.display = "flex";
    logoContainer.style.justifyContent = "center";
    logoContainer.style.alignItems = "center";
    logoContainer.style.gap = "10px";

    logo.style.width = "32px";
    logo.style.height = "32px";




    header.appendChild(logoContainer);
    logoContainer.appendChild(logo);
    logoContainer.appendChild(extensionHeader);
}

const makeTheSpeech = (isRequiered, questionType, text) => {
    text = text.replace("*", "")
    text = text.replace("Обязательное поле", "")
    var speech = ""
    isRequiered ? speech += "Это обязательный вопрос.\n " : speech += "Это необязательный вопрос.\n "
    switch (questionType) {
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
            speech += "Это вопрос с выпадающим списком. Нажмите пробел чтобы выбрать список и выберите значения в нем и нажмите пробел. Для подтверждения - нажмите Пробел\n ";
            break;
        default: 
            speech += " "
    }

    speech += " " + text;

    return speech;
}

const goToTheNextQuestion = (previous, next) => {
    hideQuestion(previous);
    showQuestion(next);
}

const addControls = (surveyForm, questions, surveyPageButtons, submitButton) => {
    var questionsArray = Array.from(questions);
    var nextButtonsArray = [];
    
    //surveyPageButtons.style.justifyContent = "space-between";
    submitButton = styleBtnAccent(submitButton)
    if (surveyForm) {
        surveyForm.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }); 
    }        
    // КНОПКА НАЧАТЬ ЗАНОВО
    const startAgainButton = createBtn('startAgainBtn', "button", "Сначала")
    if (surveyPageButtons) {
        surveyPageButtons.appendChild(startAgainButton);
    }
    if (submitButton) {
        submitButton.style.display = "none";
    }
    questionsArray.forEach((question, questionIndex) => {
        // Поиск частей инпута 
        var { 
            questionId,
            questionType,
            inputField,
            questionTextContent,
            isRequiered
            } = getQuestionElements(question)

        inputField.style.fontSize = "24px";
        if (questionType == "DropdownQuestion") {
             inputField.addEventListener("click", () => {
                sayTheThing("Выбранный вариант " + inputField.textContent)
             })
        }
        
        var text = makeTheSpeech(isRequiered, questionType, questionTextContent);
        // КНОПКА ПРОИЗНЕСТИ ТЕКСТ ВОПРОСА
        var alertButton = createBtn(questionId + "-AlertButton", "button", "Повторить")
            alertButton.addEventListener('click', function() {
                sayTheThing(text);
                inputField.focus();
            });
        // КНОПКА ДАЛЕЕ
        var nextButton = createBtn(questionId + "-NextButton", "button", "Далее")
        if (questionId) {
            surveyPageButtons.appendChild(alertButton);
            surveyPageButtons.appendChild(nextButton);
        }

        if (questionIndex > 0) {
            // console.log("questionIndex: " + questionIndex)
            var previousQuestion = questionsArray[questionIndex-1]
            var {
                inputField: previousQuestionInputField,
                questionType: previousQuestionType
            } = getQuestionElements(previousQuestion)
            var previousQuestionNextButton = nextButtonsArray[questionIndex-1]
            
            previousQuestionInputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    if (previousQuestionInputField.validity.valid) {
                        hideQuestion(previousQuestion);
                        showQuestion(question);
                    }
                }
            });       
            previousQuestionNextButton.addEventListener('click', function() {
                if (previousQuestionInputField.validity.valid) {
                    hideQuestion(previousQuestion);
                    showQuestion(question);
                }
            });

            if ((questionIndex + 1) === questionsArray.length) {
                nextButton.addEventListener("click", function() {
                    if (inputField.validity.valid) {
                        hideQuestion(question);
                        submitButton.style.display = "flex";
                        submitButton.focus()
                        sayTheThing('Вы заполнили форму. Для подтверждения нажмите пробел.')
                    }
                })
                inputField.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        if (inputField.validity.valid) {
                            hideQuestion(question);
                            submitButton.style.display = "flex";
                            submitButton.focus()
                            sayTheThing('Вы заполнили форму. Для подтверждения нажмите пробел.')
                        } 
                    }
                })
            }
            hideQuestion(question)
        } else {
            // alert(questionTextContent);
            sayTheThing(questionTextContent);
            inputField.focus()
        }
        nextButtonsArray.push(nextButton)
    })
    startAgainButton.addEventListener('click', function() {
        hideAllQuestions(questionsArray);
        hideButton(submitButton);
        showQuestion(questionsArray[0]);
    })    
}

const stylePage = () => {
    var textInputsArray = Array.from(document.getElementsByClassName("TextQuestion-Input"));

    if (textInputsArray) {
        textInputsArray.forEach((textInput) => {
            textInput.style["max-width"] = "100%";
            var inputField = textInput.querySelectorAll("input")[0];
            if (inputField) {
                inputField.style.fontSize = "24px";
                inputField.style.height = "52px";
            }
        })
    }
}

const newFormLoaded = () => {
    // console.log("NewForm");
    var isButtonsExist = document.querySelectorAll("[id*='AlertButton']")[0] ? true : false;
    var isLogoExist = document.getElementById("extensionLogo");
    var surveyForm = document.querySelectorAll("form")[0];
    var questions = document.getElementsByClassName("QuestionMarkup Question");
    var surveyPageButtons = document.getElementsByClassName("SurveyPage-Buttons")[0];
    var submitButton = document.getElementsByClassName("SurveyPage-Button")[0];

    if (!isLogoExist && !isButtonsExist){
        createLogo();
        stylePage();
    }
    if (!isButtonsExist) {
        addControls(surveyForm, questions, surveyPageButtons, submitButton);
    }
}
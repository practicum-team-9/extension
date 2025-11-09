import { createLogo } from "./logoScript/createLogo";
import { makeTheSpeech } from "./speechScripts/makeTheSpeech";
import { sayTheThing } from "./speechScripts/sayTheThing";
import { styleBtn, styleBtnAccent, stylePage } from "./styleScript/styleScript";

interface iCreateBtn {
    name: string,
    type: 'button' | 'submit' | 'reset',
    text: string,
}

const createBtn = (props: iCreateBtn) => {
// Creates and adds style to a button
    var btn = document.createElement('button');
    if (props.name.endsWith('-NextButton')) {
        btn = styleBtnAccent(btn)
    } else {
        btn = styleBtn(btn)
    }
    btn.id = props.name;
    btn.type = props.type;
    btn.textContent = props.text

    return btn;
}

const showQuestion = (question: HTMLElement) => {
    // Поиск частей инпута 
    var { 
        questionId,
        questionType,
        inputField,
        questionTextContent,
        isRequired
        } = getQuestionElements(question)
    
    var text = makeTheSpeech({isRequired, questionType, text: questionTextContent});
    sayTheThing(text)
    showQuestionButtons(questionId);
    question.style.display = "flex";
    inputField.focus();

}

const buttonTypes = ["AlertButton", "NextButton"]

const showQuestionButtons = (questionId: string) => {
    buttonTypes.forEach((type) => {
        const btn = document.getElementById(questionId + "-" + type)

        if (btn) {
            btn.style.display = "flex";
        } else {
            console.log('There is no button!')
        }
    })
}

const hideQuestionButtons = (questionId: string) => {
    buttonTypes.forEach((type) => {
        var btn = document.getElementById(questionId + "-" + type)
        if (btn instanceof HTMLButtonElement) {
            hideButton(btn);
        } else {
            console.log("This is not a button, but something else!")
            console.log(typeof btn)
            console.log(btn)

        };
    })
}

const hideQuestion = (question: HTMLElement) => {
    var { 
        questionId
        } = getQuestionElements(question)
    hideQuestionButtons(questionId);
    question.style.display = "none";
}

const hideButton = (btn: HTMLButtonElement) => {
    if (btn) {
        btn.style.display = "none";
    }
}

const hideAllQuestions = (questionsArray: HTMLElement[]) => {
    questionsArray.forEach((question, questionIndex) => {
        hideQuestion(question)
    })
}

const getQuestionElements = (question: HTMLElement) => {
    var classList = question.classList;
    var questionType = classList[1];
    // questionInputElement - элемент который есть в каждом вопросе, но может быть скрыт.
    var questionInputElement: HTMLInputElement | HTMLTextAreaElement = question.querySelectorAll("input")[0] ? question.querySelectorAll("input")[0] : question.querySelectorAll("textarea")[0];
    // inputField используется в логике как элемент на который ставится фокус
    var inputField: HTMLInputElement | HTMLTextAreaElement | HTMLElement = questionInputElement
    // inputField = question.querySelectorAll("input")[0] ? question.querySelectorAll("input")[0] : question.querySelectorAll("textarea")[0];    
    // var questionId = inputField.id ? inputField.id : inputField.name;

    var questionId = questionInputElement.id ? questionInputElement.id : questionInputElement.name;
    var isRequired = question.querySelectorAll("[class*='Required']")[0] ? true : false;

    var questionLabel = question.getElementsByClassName("QuestionLabel")[0];
    var questionTextContent = question.textContent;
    // TO DO: 
    // Solve the problem with dropdown question having pseudo input field
    var documentHTMLElemnt = document.getElementById(questionId)

    if (questionType == "DropdownQuestion") {
        if (documentHTMLElemnt) {
            inputField = documentHTMLElemnt
        } else {
            console.log('У этого выпадающего списка нет элемента для фокуса.')
        }
    }

    return { 
        questionId,
        questionType,
        inputField,
        questionLabel,
        questionTextContent,
        isRequired
     }
}

const addControls = (surveyForm: HTMLFormElement, questions: NodeListOf<HTMLElement>, surveyPageButtonsContainer: HTMLElement, submitButton: HTMLButtonElement) => {
    var questionsArray = Array.from(questions);
    var nextButtonsArray: HTMLElement[] = [];
    
    submitButton = styleBtnAccent(submitButton)
    if (surveyForm) {
        surveyForm.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }); 
    }        
    // КНОПКА НАЧАТЬ ЗАНОВО
    const startAgainButtonProps: iCreateBtn = {
        name: 'startAgainBtn',
        type: 'button',
        text: 'Сначала',

    }

    const startAgainButton = createBtn(startAgainButtonProps)
    if (surveyPageButtonsContainer) {
        surveyPageButtonsContainer.appendChild(startAgainButton);
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
            isRequired
            } = getQuestionElements(question)

        inputField.style.fontSize = "24px";
        if (questionType == "DropdownQuestion") {
             inputField.addEventListener("click", () => {
                sayTheThing("Выбранный вариант " + inputField.textContent)
             })
        }
        var textProps = {
            isRequired,
            questionType,
            text: questionTextContent
        }
        var text = makeTheSpeech(textProps);
        // КНОПКА ПРОИЗНЕСТИ ТЕКСТ ВОПРОСА

        var alertButtonProps: iCreateBtn = {
            name: questionId + "-AlertButton",
            type: 'button',
            text: 'Повторить',
        }

        var alertButton = createBtn(alertButtonProps)
            alertButton.addEventListener('click', function() {
                sayTheThing(text);
                inputField.focus();
            });
        // КНОПКА ДАЛЕЕ
        var nextButtonProps: iCreateBtn = {
            name: questionId + "-NextButton",
            type: 'button',
            text: 'Далее',
        }

        var nextButton = createBtn(nextButtonProps)
        if (questionId) {
            surveyPageButtonsContainer.appendChild(alertButton);
            surveyPageButtonsContainer.appendChild(nextButton);
        }

        if (questionIndex > 0) {
            // console.log("questionIndex: " + questionIndex)
            var previousQuestion = questionsArray[questionIndex-1]
            var {
                inputField: previousQuestionInputField,
                questionType: previousQuestionType
            } = getQuestionElements(previousQuestion)
            var previousQuestionNextButton = nextButtonsArray[questionIndex-1]

            // PIN HERE
            
            previousQuestionInputField.addEventListener('keydown', function(event) {
                if (event instanceof KeyboardEvent){
                    if (event.key === 'Enter') {
                        hideShow(question, previousQuestion, previousQuestionInputField)
                    }
                }
            });       
            previousQuestionNextButton.addEventListener('click', function() {
                hideShow(question, previousQuestion, previousQuestionInputField)
            });

            if ((questionIndex + 1) === questionsArray.length) {
                nextButton.addEventListener("click", function() {
                    hideQuestShowSubmit(inputField, question, submitButton)
                })
                inputField.addEventListener('keydown', function(event) {
                    if (event instanceof KeyboardEvent) {
                        if (event.key === 'Enter') {
                            hideQuestShowSubmit(inputField, question, submitButton)
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

const hideQuestShowSubmit = (inputField: HTMLElement | HTMLInputElement | HTMLTextAreaElement, question: HTMLElement, submitButton: HTMLButtonElement) => {    
    if (inputField instanceof HTMLInputElement || inputField instanceof HTMLTextAreaElement ) {
        if (inputField.validity.valid) {
        hideQuestion(question);
        submitButton.style.display = "flex";
        submitButton.focus()
        sayTheThing('Вы заполнили форму. Для подтверждения нажмите пробел.')
        }
    } else if (inputField instanceof HTMLElement) {
        hideQuestion(question);
        submitButton.style.display = "flex";
        submitButton.focus()
        sayTheThing('Вы заполнили форму. Для подтверждения нажмите пробел.')
    } else {
        console.log('WARNING! This should never show up!')
    }
}



const hideShow = (question: HTMLElement, previousQuestion: HTMLElement, previousQuestionInputField: HTMLElement | HTMLInputElement | HTMLTextAreaElement) => {        
    if (previousQuestionInputField instanceof HTMLInputElement || previousQuestionInputField instanceof HTMLTextAreaElement ) {
        if (previousQuestionInputField.validity.valid) {
            hideQuestion(previousQuestion);
            showQuestion(question);
        }
    } else if (previousQuestionInputField instanceof HTMLElement) {
        hideQuestion(previousQuestion);
        showQuestion(question);
    } else {
        console.log('WARNING! This should never show up!')
    }
}

export const newFormLoaded = () => {
    // console.log("NewForm");
    var isButtonsExist = document.querySelectorAll("[id*='AlertButton']")[0] ? true : false;
    var isLogoExist = document.getElementById("extensionLogo");
    var surveyForm = document.querySelectorAll("form")[0];
    var questions = document.querySelectorAll<HTMLElement>(".QuestionMarkup.Question");
    var surveyPageButtonsContainer = document.querySelectorAll<HTMLElement>(".SurveyPage-Buttons")[0];
    var submitButton = document.querySelectorAll<HTMLButtonElement>(".SurveyPage-Button")[0];

    if (!isLogoExist && !isButtonsExist){
        createLogo();
        stylePage();
    }
    if (!isButtonsExist ) {
        addControls(surveyForm, questions, surveyPageButtonsContainer, submitButton);
    }
}
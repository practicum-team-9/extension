export const stylePage = () => {
    var textInputsArray = Array.from(document.getElementsByClassName("TextQuestion-Input"));

    if (textInputsArray) {
        textInputsArray.forEach((textInput) => {
            if (textInput instanceof HTMLElement){
                // textInput.style["max-width"] = "100%";
                textInput.style.maxWidth = "100%";
                var inputField = textInput.querySelectorAll("input")[0];
                if (inputField) {
                    inputField.style.fontSize = "24px";
                    inputField.style.height = "52px";
                }
            }
        })
    }
}



export const styleBtnAccent = (btn: HTMLButtonElement) => {
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

export const styleBtn = (btn: HTMLButtonElement) => {
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
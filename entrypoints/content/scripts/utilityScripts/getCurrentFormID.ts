export const getCurrentFormID = () => {
    const url = window.location.href
    const id = url.replace("https://forms.yandex.ru/", "").split('/')[1]

    return id;
}
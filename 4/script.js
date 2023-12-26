/* Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, 
где get-параметр limit — это введённое число.
Пример. Если пользователь ввёл 8, то запрос будет вида: https://jsonplaceholder.typicode.com/photos?_limit=8.
После получения данных вывести ниже картинки на экран. */

const button = document.querySelector('button');
const resultNode = document.querySelector('.result');

button.addEventListener('click', function() {
    const width = Number(document.querySelector('.input_first').value);
    const height = Number(document.querySelector('.input_second').value);
    
    if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
        fetch(`https://dummyimage.com/${width}x${height}/`)
            .then((response) => {
                resultNode.innerHTML = `<img src="${response.url}"/>`;
            })
            .catch(() => console.log('error'))
    } else {
        resultNode.textContent = `Одно из чисел вне диапазона от 100 до 300`;
    }
});



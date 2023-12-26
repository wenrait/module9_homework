/* Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, 
где get-параметр limit — это введённое число.
Пример. Если пользователь ввёл 8, то запрос будет вида: https://jsonplaceholder.typicode.com/photos?_limit=8.
После получения данных вывести ниже картинки на экран. */

const button = document.querySelector('button');
const resultNode = document.querySelector('.result');

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', url);
    

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log(`Статус ответа: ${xhr.status}`);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result)
            }
        }
    }

    xhr.send();
}

button.addEventListener('click', function() {
    const value = Number(document.querySelector('input').value);
    if (value >= 1 && value <= 10) {
        const url = `https://jsonplaceholder.typicode.com/photos?_limit=${value}`;
        useRequest(url, displayResult);
    } else {
        resultNode.textContent = `Число вне диапазона от 1 до 10`;
    }
});

function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
                src="${item.url}"
                class="card-image"
            />
        </div>
        `;
        cards = cards + cardBlock;
    })
    resultNode.innerHTML = cards;
}




const button = document.querySelector('button');
const resultNode = document.querySelector('.result');

document.addEventListener('DOMContentLoaded', function() {
    let lastResult = localStorage.getItem('lastResult');
    let json = JSON.parse(lastResult)
    if (json) {
        displayResult(json)
    }
})



button.addEventListener('click', function() {
    const page = Number(document.querySelector('.input_first').value);
    const limit = Number(document.querySelector('.input_second').value);

    const pageRange = page >= 1 && page <= 10;
    const limitRange = limit >= 1 && limit <= 10;

    if (pageRange && limitRange) {
        useRequest(page, limit)
    } else if (pageRange || limitRange) {
        if (pageRange) {
            resultNode.textContent = `Лимит вне диапазона от 1 до 10`;
        } else {
            resultNode.textContent = `Номер страницы вне диапазона от 1 до 10`;
        }
    } else {
        resultNode.textContent = `Номер страницы и лимит вне диапазона от 1 до 10`;
    }
});

function useRequest(page, limit) {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
            .then(response => response.json())
            .then((json) => {
                localStorage.setItem('lastResult', JSON.stringify(json))
                displayResult(json)})
}


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




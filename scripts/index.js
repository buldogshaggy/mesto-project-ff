// @todo: Темплейт карточки
// @todo: DOM узлы

function getTemplate() {
    return document.getElementById('card-template');
}

const cards = [
    {link: './images/ruba.jpg', name: 'Рубцовск', },
    {link: './images/yarovoe.jpg', name: 'Яровое', },
    ...initialCards,
]

// @todo: Вывести карточки на страницу
function prepareCards() {
    const cardTemplate = document.querySelector('#card-template');
    console.log(cardTemplate);

    cards.forEach((x) => {
        addCard(x.name, x.link)
    })

}

prepareCards();

// @todo: Функция создания карточки
function addCard(name, link) {
    const template = document.getElementById('card-template');

    const clone = template.content.cloneNode(true);

    const image = clone.querySelector('.card__image');
    image.src = link;

    const titleElement = clone.querySelector('.card__title');
    titleElement.textContent = name;
  
    const container = document.getElementById('card-container');
    container.appendChild(clone);
}

// @todo: Функция удаления карточки
function deleteCard(ctx) {
    // @todo: опасно пиздец (передалть на id'шники, но они уже есть в template)
    ctx.parentNode.remove()
}

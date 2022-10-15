'use strict';

const cardText = document.querySelector('.card-text'),
      buttons = document.querySelectorAll('button'),
      turnBtn = buttons[0],
      nextBtn = buttons[1];

let collectionName = localStorage.getItem('focusCollection');
let items = [];
JSON.parse(localStorage.getItem('collections')).forEach((collection) => {
  if (collection.title == collectionName) {
    items = collection.items;
  }
});
let currentItem = 0;

changeText(items[0].key);

turnBtn.addEventListener('click', () => {
  if (cardText.textContent == items[currentItem].value) {
    changeText(items[currentItem].key);
  } else {
    changeText(items[currentItem].value);
  }
});

nextBtn.addEventListener('click', () => {
  currentItem++;
  if (currentItem < items.length) {
    changeText(items[currentItem].key);
  } else {
    endQuiz();
  }
});

function changeText(text) {
  cardText.textContent = text;
}
function endQuiz() {
  console.log('Quiz has ended');
  location.href = "index.html";
}








document.addEventListener('DOMContentLoaded', () => {

  const front = document.querySelector('.front div'),
        back = document.querySelector('.back div'),
        card = document.querySelector('.card'),
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
  
  setText(items[0].key, items[0].value);
  
  turnBtn.addEventListener('click', () => {  
    card.classList.toggle('turn');
  });
  
  nextBtn.addEventListener('click', () => {
    currentItem++;
    if (currentItem < items.length) {
      setText(items[currentItem].key, items[currentItem].value);
    } else {
      endQuiz();
    }
  });
  
  function setText(key, value) {
    front.textContent = key;
    back.textContent = value;  
  }
  
  function endQuiz() {
    console.log('Quiz has ended');
    location.href = "index.html";
  }

});








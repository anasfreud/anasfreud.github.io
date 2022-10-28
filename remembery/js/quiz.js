document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.item-card'),
        flippers = document.querySelectorAll('.content'),  
        buttons = document.querySelectorAll('button'),
        turnBtn = buttons[0],
        nextBtn = buttons[1];

  const cardsCount = 4;
  const conditions = [
    `card-last`,
    `card-mid`,
    `card-first`,
    `card-none`
  ];

  let collectionName = localStorage.getItem('focusCollection');
  let items = [];
  let currentItem = 0;
  let offset = 0;
  
  // get items  
  JSON.parse(localStorage.getItem('collections')).forEach((collection) => {
    if (collection.title == collectionName) {
      items = collection.items;
    }
  });

  setText(cardsCount - 1, items[0].key, items[0].value);
  
  turnBtn.addEventListener('click', () => {  
    flippers[previous(offset)].classList.toggle('turn');
  });

  
  nextBtn.addEventListener('click', () => {
    flippers[previous(offset)].classList.remove('turn');
    currentItem++;


    if (currentItem < items.length) {


      if (items.length - currentItem < cardsCount) {

      }

      setText(next(offset + 1), items[currentItem].key, items[currentItem].value);
      setText(next(offset), "", "");
      let index = offset;

      for (let i = 0; i < 4; i++) {
        cards[index].style.cssText = `animation-name:` + conditions[i] + ';';
        index = next(index);
      }

      offset = previous(offset);
    } else {
      endQuiz();
    }
  });

  function setText(cardIndex, key, value) {
    const front = cards[cardIndex].querySelector('.front');
    const back = cards[cardIndex].querySelector('.back');
    front.innerHTML = key;
    back.textContent = value;  
  }
  
  function endQuiz() {
    console.log('Quiz has ended');
    location.href = "index.html";
  }

  function previous(index) {
    return index - 1 < 0 ? index - 1 + cardsCount : index - 1;
  }

  function next(index) {
    return (index + 1) % cardsCount;
  }

}); 
'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input'),
        btn = document.querySelector('button'),
        total = document.querySelector('.total'),
        priceInput = inputs[0],
        countInput = inputs[1];
  
  let reg = /\D/;
  btn.addEventListener('click', () => {
    if (reg.test(priceInput.value) || reg.test(countInput.value)) {
      total.textContent = 'Неверный формат!';
    } else {
      total.textContent = +priceInput.value * +countInput.value;
    }
  });


});

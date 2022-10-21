document.addEventListener('DOMContentLoaded', () => {

  const select = document.querySelector('select'),
        radios = document.querySelector('#radios'),
        radioBtns = radios.querySelectorAll('input'),
        check = document.querySelector('#check'),
        checkbox = check.querySelector('input'),
        total = document.querySelector('.total'),
        count = document.querySelector('#count');
  
  
  let reg = /\D/;

  radios.hidden = true;
  check.hidden = true;

  select.addEventListener('change', () => {

    switch(select.value) {
      case 'product1':
        radios.hidden = true;
        check.hidden = true;
        break;
      case 'product2':
        radios.hidden = true;
        check.hidden = false;
        break;
      case 'product3':
        radios.hidden = false;
        check.hidden = true;
        break;
    }

    recalculate();

  });

  count.addEventListener('change', () => {
    recalculate();
  });

  checkbox.addEventListener('change', () => {
    recalculate();
  });

  radioBtns.forEach((btn) => {
    btn.addEventListener('change', () => {
      recalculate();
    });
  });

  function recalculate() {

    if (reg.test(count.value)) {
      total.textContent = "Неверный формат";
    } else {
      switch(select.value) {
        case 'product1':
          total.textContent = +count.value * 10;
          break;
        case 'product2':
          if (checkbox.checked) {
            total.textContent = +count.value * 30;
          } else {
            total.textContent = +count.value * 20;
          }
          break;
        case 'product3':
            if (radioBtns[0].checked) {
              total.textContent = +count.value * 100;
            } else if (radioBtns[1].checked) {
              total.textContent = +count.value * 200;
            } else if (radioBtns[2].checked) {
              total.textContent = +count.value * 300;
            }
          break;
      }
    }
  }
  
});

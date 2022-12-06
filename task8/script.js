document.addEventListener('DOMContentLoaded', () => {

  const btn = document.querySelector('button#transition'),
        formBtn = document.querySelector('form button'),
        formWrapper = document.querySelector('.form-wrapper'),
        form = document.querySelector('form'),
        inputs = document.querySelectorAll('.form-input');
        
  const strings = {
    sucess: 'Данные были успешно отправлены',
    failure: 'Возникла ошибка: ',
  };
  const fields = ['name', 'email', 'message', 'agreement'];
        
  // скрываем форму, если передвигаемся назад по истории
  window.addEventListener('popstate', () => {
    formWrapper.style.cssText = `animation-name: hide-form;`;
    setTimeout(() => {
      formWrapper.hidden = true;
    }, 600);
  });

  // изначально скрываем форму и восстанавливаем последние введенные данные
  formWrapper.hidden = true;
  restore();

  // переход на form
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, null, '/form');
    formWrapper.style.cssText = `animation-name: show-form;`;
    formWrapper.hidden = false;
  });

  // события смены текста в полях ввода
  inputs.forEach(i => {
    i.addEventListener('change', (e) => {
      localStorage.setItem(e.target.name, e.target.value);
    });
  });

  inputs[inputs.length - 1].addEventListener('change', (e) => {
    localStorage.setItem(e.target.name, e.target.checked);
  });

  // отправка данных на сервер
  formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!inputs[inputs.length - 1].checked) {
      return;
    }
    const formData = new FormData(form);
    let data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      agreement: formData.get('agreement'),
    };
    fetch('https://api.slapform.com/TPDxT6kZwI', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      })
      .then(json => {
        console.log(json);
        showSucces();
      })
      .catch((err) => showFailure(err));

  });

  // показать сообщение об успешном отправлении
  function showSucces() {
    form.reset();
    localStorage.clear();
    let msg = document.createElement('div');
    msg.textContent = strings.sucess;
    msg.classList.add('msg-sucess');
    document.body.append(msg);
    setTimeout(() => {
      msg.remove();
    }, 2000);
  }

  // показать сообщение об ошибке
  function showFailure(err) {
    let msg = document.createElement('div');
    msg.textContent = strings.failure + err;
    msg.classList.add('msg-failure');
    document.body.append(msg);
    setTimeout(() => {
      msg.remove();
    }, 2000);
    
  }

  // восстановление из localHost
  function restore() {
    for (let i = 0; i < fields.length; i++) {
      const value = localStorage.getItem(fields[i]);
      if (value != null) {
        inputs[i].value = value;
        if (fields[i] == 'agreement') {
          if (value == 'true') {
            inputs[i].checked = true;
          } else {
            inputs[i].checked = false;
          }
        }
      }
    }
  }
});

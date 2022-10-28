
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelector('.items'),
        saveBtn = document.querySelector('#save'),
        backBtn = document.querySelector('#cancel'),
        addBtn = document.querySelector('#add'),
        deleteBtn = document.querySelector('#delete'),
        titleInput = document.querySelector('#title'),
        descriptionInput = document.querySelector('#description'),
        warning = document.querySelector('#warning');
        

        
  const collections = JSON.parse(localStorage.getItem('collections'));
  let collectionName = localStorage.getItem('focusCollection');
  let editableCollection = {
    title: "",
    description: "",
    items: [
      {
        key: "Word",
        value: "Слово",
      }
    ],
  };
  
  if (collectionName != "") {
    // find collection in collections list
    collections.forEach((collection) => {
      if (collection.title == collectionName) {
        editableCollection =  collection;
      }
    });
  } else {
    collections.push(editableCollection);
  }

  //fill inputs
  titleInput.value = editableCollection.title;
  descriptionInput.value = editableCollection.description;

  // show all items
  fetchItems(); 

  titleInput.addEventListener('focusout', () => {
    if (!isTitleUnique(titleInput.value)) {
      warning.textContent = 'Title must be unique';
    } else {
      warning.textContent = "";
    }
  });

  saveBtn.addEventListener('click', () => {
    if (titleInput.value == "") {
      location.href = '#title';
      warning.textContent = 'Title must not be empty';
      return;
    }

    if (!isTitleUnique(titleInput.value)) {
      location.href = '#title';
      warning.textContent = 'Title must be unique';
      return;
    }

    saveCollection();
    location.href = 'index.html';
  });

  backBtn.addEventListener('click', () => {
    location.href = 'index.html';
  });

  addBtn.addEventListener('click', () => {
    addItem('', '');
  });

  deleteBtn.addEventListener('click', () => {
    //are you sure?
    deleteCollection();
    localStorage.setItem('collections', JSON.stringify(collections));
    location.href = "index.html";
  });



  function fetchItems() {
    editableCollection.items.forEach((item) => {
      addItem(item.key, item.value);
    });
  }

  function addItem(key, value) {
    const card = document.createElement('div');
    card.classList.add('item');
    card.innerHTML += `<div class="d-flex flex-row align-items-center my-3">
    <div class="d-flex flex-md-row flex-column flex-nowrap align-items-center">
      <input class="mb-2 mb-md-0" type="text" value="${key}">
      <input type="text" value="${value}">
    </div>
    <button tabindex="-1" class="delete-item"><img src="images/cross.png"></button>
  </div>
    `;
    cards.append(card);

    const del = card.querySelector('button');
    del.addEventListener('click', () => {
      card.remove();
    });
  }

  function saveCollection() {

    //save title and description

    editableCollection.title = titleInput.value.trim();
    editableCollection.description = descriptionInput.value.trim();

    //save items
    let newItems = [];
    for (const item of cards.children) {
      const inputs = item.querySelectorAll('input');
      if (inputs[0].value != '' && inputs[1].value != '')
      {
        newItems.push({ 
          key: inputs[0].value, 
          value: inputs[1].value 
        });
      }
    }
    editableCollection.items = newItems;

    localStorage.setItem('collections', JSON.stringify(collections));
  }


  function deleteCollection() {
    collections.forEach((collection, index) => {
      if (collection.title == collectionName) {
        collections.splice(index, 1);
      }
    });
  }

  function isTitleUnique(title) {
    title = title.trim();
    if (title == editableCollection.title) {
      return true;
    }
    let trigger = true;
    collections.forEach((collection) => {
      if (collection.title === title) {
        trigger = false;
      }
    });
    return trigger;
  }

});



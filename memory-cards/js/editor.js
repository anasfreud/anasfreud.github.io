'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button'),
        cards = document.querySelector('.items'),
        saveBtn = buttons[0],
        backBtn = buttons[1],
        addBtn = buttons[2],
        deleteBtn = buttons[3],
        titleInput = document.querySelector('#title'),
        descriptionInput = document.querySelector('#description');
        

        
  const collections = JSON.parse(localStorage.getItem('collections'));
  let collectionName = localStorage.getItem('focusCollection');
  let editableCollection;
  
  // find collection in collections list
  collections.forEach((collection) => {
    if (collection.title == collectionName) {
      editableCollection =  collection;
    }
  });


  //fill inputs
  titleInput.value = editableCollection.title;
  descriptionInput.value = editableCollection.description;

  // show all items
  fetchItems();


  titleInput.addEventListener('focusout', () => {
    console.log(isTitleUnique(titleInput.value));
  });

  saveBtn.addEventListener('click', () => {
    
    if (!isTitleUnique(titleInput.value)) {
      console.log('Title must be unique');
      return;
    }

    saveCollection();
    location.href = "index.html";
  });

  backBtn.addEventListener('click', () => {
    location.href = "index.html";
  });

  addBtn.addEventListener('click', () => {
    addItem('', '');
  });

  deleteBtn.addEventListener('click', () => {
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
    card.innerHTML += ` <input type="text" value="${key}">
      <input type="text" value="${value}">
      <button class="button-dark">Delete</button>
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



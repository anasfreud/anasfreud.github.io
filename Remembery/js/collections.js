'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.querySelector('button#create'),
        collectionCreator = document.querySelector('.collection#create'),
        collections = document.querySelector('.collections');
  
  const sampleStrings = {
    title: 'New collection',
    description: 'Here will be your description',
  };
  let collectionsCount = 0;
  
  createBtn.addEventListener('click', () => {
    collectionsCount++;
    createCollection(sampleStrings.title + " #" + collectionsCount , sampleStrings.description);
    saveCollection(sampleStrings.title + " #" + collectionsCount, sampleStrings.description);
  });
  
  getCollections();


  function getCollections() {
    const collectionsArray = JSON.parse(localStorage.getItem('collections'));
    if (collectionsArray != null) {
      collectionsArray.forEach(collection => {
        createCollection(collection.title, collection.description);
        collectionsCount++;
      });
    }
  }

  function createCollection(title, description) {
    const collection = document.createElement('div');
    collection.classList.add('collection', 'panel');
    collection.innerHTML = `
      <div class="title">${title}</div>
      <div class="description">${description}</div>
      <div class="buttons">
        <button class="button-dark" data-title="${title}">Edit</button>
        <button class="button-light" data-title="${title}">Train</button>
      </div>
    `;

    collections.insertBefore(collection, collectionCreator); 

    const buttons = collection.querySelectorAll('button');
    buttons[0].addEventListener('click', (event) => {
      localStorage.setItem('focusCollection', event.target.dataset.title)
      location.href = "editor.html";
    });
    
    buttons[1].addEventListener('click', (event) => {
      localStorage.setItem('focusCollection', event.target.dataset.title)
      location.href = "quiz.html";
    });

  }

  function saveCollection(title, description) {
    
    const collectionObj = {
      title: title,
      description: description,
      items: [],
    };

    let collectionsArray = JSON.parse(localStorage.getItem('collections'));
    if (collectionsArray == null) {
      localStorage.setItem('collections', JSON.stringify([]));
      collectionsArray = [];

    } 
    collectionsArray.push(collectionObj);
    localStorage.setItem('collections', JSON.stringify(collectionsArray));
  }

});


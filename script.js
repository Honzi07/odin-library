'use strict';

const myLibrary = [];

function Book(title, author, pages = 1, comment, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.comment = comment;
  this.read = read;
}

const testBook = new Book('The Hobbit', 'Tolkien', 241, '', true);

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}
addBookToLibrary(testBook);

function createBook() {
  document.querySelector('.book-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const read = document.querySelector('#read').checked;
    const [title, author, pages, comment] = [
      ...document.querySelectorAll('input'),
    ].map(input => input.value);
    console.log(title, author, pages, comment, read);

    const book = new Book(title, author, +pages, comment, read);
    addBookToLibrary(book);
    console.log(...myLibrary);
  });
}
createBook();

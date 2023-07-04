'use strict';

const bookContainer = document.querySelector('.book-container');
const buttonCreate = document.querySelector('#button-create');
let dataIndex = 0;

const myLibrary = [];

function Book(title, author, pages, comment, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.comment = comment;
  this.read = read;
}

function createBook() {
  document.querySelector('.book-form').addEventListener('submit', function (e) {
    e.preventDefault();
  });

  const [title, author, pages, comment] = [
    ...document.querySelectorAll('.book-form input'),
  ].map(input => input.value);
  const read = document.querySelector('#read').checked;

  const book = new Book(title, author, +pages, comment, read);
  myLibrary.push(book);
  console.log(...myLibrary);
  renderBook();
}
buttonCreate.addEventListener('click', createBook);

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function renderBook() {
  const lastBook = myLibrary.slice(-1);
  console.log(...lastBook);

  for (const el of lastBook) {
    const html = `
    <div class="book-card" data-index="${dataIndex++}">
      <h2 class="book-title">${el.title}</h2>
      <div class="book-details">
        <ul>
          <li class="book-details-author">Author: ${el.author}</li>
          <li class="book-details-pages">Pages: ${el.pages}</li>
          <li class="book-details-comment">Comment: ${el.comment}</li>
          <li class="book-details-read">
          <span>
          ${el.read ? 'I already read it' : 'I need to read it'}
          </span>
          <input type="checkbox" name="read" class="toggle-read-status" />
          </li>
          <li>
          <input type="button" class="button-remove" value="remove " />
        </li>
        </ul>
      </div>
    </div>
    `;
    bookContainer.insertAdjacentHTML('beforeend', html);
  }
}

function getElement(e) {
  const element = e.target;
  const bookElement = element.closest('.book-card');
  return bookElement;
}

function readStatus(e) {
  const bookCard = getElement(e);
  const bookIndex = bookCard.dataset.index;
  const book = myLibrary[bookIndex];
  const span = bookCard.querySelector('li span');

  if (book.read) {
    span.textContent = 'I need to read it';
  } else span.textContent = 'I already read it';

  book.toggleReadStatus();
  console.log(book.read, span);
}

function removeBook(e) {
  const bookCard = getElement(e);
  const bookIndex = bookCard.dataset.index;

  console.log(bookIndex);
  myLibrary.splice(bookIndex, 1);
  console.log(myLibrary);
  bookCard.remove();

  dataIndex = 0;
  document.querySelectorAll('.book-card').forEach(el => {
    el.dataset.index = dataIndex++;
  });
}

bookContainer.addEventListener('click', function (e) {
  getElement(e);

  if (e.target.classList.contains('button-remove')) {
    removeBook(e);
  }
});

bookContainer.addEventListener('change', function (e) {
  if (e.target.classList.contains('toggle-read-status')) {
    readStatus(e);
  }
});

document.addEventListener('click', function (e) {
  // console.log(e.target.dataset.index);
  console.dir(e.target);
});

console.log(document.querySelectorAll('.book-details-read'));

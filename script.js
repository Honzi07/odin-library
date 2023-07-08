'use strict';

const bookContainer = document.querySelector('.book-container');
const bookForm = document.querySelector('.book-form');
const bookFormContainer = document.querySelector('.book-form-container');
const buttonCreate = document.querySelector('#add-book');
let dataIndex = 0;

const myLibrary = [];

function Book(title, author, pages, comment, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.comment = comment;
  this.read = read;
}

function createBook(e) {
  e.preventDefault();
  const [title, author, pages, comment] = [
    ...document.querySelectorAll('.book-form input'),
  ].map(input => input.value);
  const read = document.querySelector('#read').checked;

  const book = new Book(title, author, +pages, comment, read);
  myLibrary.push(book);
  console.log(...myLibrary);
  renderBook();
}
bookForm.addEventListener('submit', createBook);

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

function getTargetElement(e) {
  const element = e.target;
  const bookElement = element.closest('.book-card');
  return bookElement;
}

function readStatus(e) {
  const bookCard = getTargetElement(e);
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
  const bookCard = getTargetElement(e);
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
  getTargetElement(e);

  if (e.target.classList.contains('button-remove')) {
    removeBook(e);
  }
});

bookContainer.addEventListener('change', function (e) {
  if (e.target.classList.contains('toggle-read-status')) {
    readStatus(e);
  }
});

document.querySelector('.open-form').addEventListener('click', function () {
  bookFormContainer.style.display = 'block';
});

document.querySelector('.close-form').addEventListener('click', function () {
  bookFormContainer.style.display = 'none';
});

window.addEventListener('click', function (e) {
  if (e.target === bookFormContainer) {
    bookFormContainer.style.display = 'none';
  }
});

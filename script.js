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

  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.dataset.index = dataIndex++;
  bookContainer.appendChild(bookCard);

  for (const el of lastBook) {
    const html = `
        <button class="button-remove" style="border: none; background: none">
          <svg
            class="button-remove"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
            />
          </svg>
        </button>
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
            </li>
            <li class="book-details-checkbox">
            <label for="read">Change read status</label>
            <input type="checkbox" name="read" class="toggle-read-status" ${
              el.read ? 'checked' : ''
            }
            />
          </li>
          </ul>
        </div>
    `;

    if (el.read) {
      bookCard.classList.add('readed');
    } else {
      bookCard.classList.add('not-readed');
    }

    bookCard.insertAdjacentHTML('beforeend', html);
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
    bookCard.classList.add('not-readed');
    bookCard.classList.remove('readed');
  } else {
    span.textContent = 'I already read it';
    bookCard.classList.add('readed');
    bookCard.classList.remove('not-readed');
  }

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

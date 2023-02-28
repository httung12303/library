const books = [];
let bookIndex = 0;

const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const readInput = document.querySelector("#read-input");
const addBookForm = document.querySelector("form");
const body = document.querySelector("body");
const addBookButton = document.querySelector("#add-book-button");
const formContainer = document.querySelector(".form-container");
const content = document.querySelector(".content");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = bookIndex++;
    }
    get info() {
        return `${this.title}, ${this.author}, ${this.pages} pages, ${this.read === true ? 'read' : 'not read yet'}`;
    }
};

addBookForm.addEventListener("submit", addBook);
addBookButton.addEventListener("click", openForm);

titleInput.addEventListener('input', () => {
    console.log(titleInput.value);
    if(titleInput.validity.valueMissing) {
        titleInput.setCustomValidity('You must input a title');
    } else {
        titleInput.setCustomValidity("");
    }
});
authorInput.addEventListener('input', () => {
    console.log(authorInput.value);
    console.log(authorInput.validity.valueMissing);
    if(authorInput.validity.valueMissing) {
        console.log(authorInput.validity.valueMissing);
        authorInput.setCustomValidity('You must provide an author');
    } else {
        authorInput.setCustomValidity("");
    }
})

function openForm() {
    formContainer.style.display = "flex";
}

function addBook(event) {
    event.preventDefault();

    const title =  titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    const book = new Book(title, author, pages, read);
    books.push(book);
    addBookCard(book);

    console.log(book.info);
}

function addBookCard(book) {
    const cardElement = document.createElement("div");
    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("p");
    const pagesElement = document.createElement("p");
    const readElement = document.createElement("input");
    const removeButton = document.createElement("button");

    titleElement.classList.add("title");
    cardElement.classList.add("card");
    authorElement.classList.add("author");
    pagesElement.classList.add("pages");
    readElement.classList.add("read");
    removeButton.classList.add("remove-button");

    cardElement.appendChild(titleElement);
    cardElement.appendChild(authorElement);
    cardElement.appendChild(pagesElement);
    cardElement.appendChild(readElement);
    cardElement.appendChild(removeButton);
    content.appendChild(cardElement);

    readElement.setAttribute("type", "checkbox");
    
    titleElement.textContent = book.title;
    authorElement.textContent = `Author: ${book.author}`;
    pagesElement.textContent = `Number of pages: ${book.pages}`;
    readElement.checked = book.read;
    removeButton.textContent = "×";
    removeButton.addEventListener("click", removeBook);

    cardElement.setAttribute("data-index", `${book.index}`);

    formContainer.style.display = "none";
}

function removeBook(e) {
    const parentBook = e.target.parentElement;
    const index = parseInt(parentBook.getAttribute("data-index"));
    parentBook.remove();
    for(let i = 0; i < books.length; i++) {
        if(books[i].index === index) {
            books.splice(i, 1);
            break;
        }
    }
}








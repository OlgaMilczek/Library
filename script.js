
class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read; 
    }
}

class Library { 
    constructor() {
        if (this.checkStorage()) {
            this.books = this.getStorage();
            for (let i in this.books) {
                let book = this.books[i];
                Object.setPrototypeOf(book, Book.prototype);
                this.render();
            }
        }
        else {
            this.books = [];
        }
    }

    checkStorage() {
        return !!localStorage.getItem('myLibrary');
    }

    setStorage() {
        const oldStorage = localStorage.getItem('myLibrary');
        const newStorage = JSON.stringify(this.books);
        if (oldStorage === newStorage)
            return false;
        localStorage.setItem('myLibrary', JSON.stringify(this.books));
        return true;
    }

    getStorage() {
        const storedProjects = JSON.parse(localStorage.getItem('myLibrary'));
        return storedProjects;
    }


    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead) {
        let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
        this.books.push(newBook);
        this.render();
        return (newBook);
    }

    render() {
        const bookContainer = document.querySelector('#book-conteiner');
        bookContainer.innerHTML = '';
        this.books.forEach((book, index) => {
            const bookLine = document.createElement('div');
            bookLine.setAttribute('data-index', index);
            bookLine.classList.add('book-position');
            for (let prop in book) {
                const bookProp = document.createElement('div');
                if(prop === 'read') {
                    const yesNoButton = document.createElement('button');
                    if (book[prop]==='true') {
                        yesNoButton.textContent = 'Yes';
                        yesNoButton.classList.add('yesButton');
                    }
                    else {
                        yesNoButton.textContent = 'No';
                        yesNoButton.classList.add('noButton');
                    }
                    yesNoButton.addEventListener('click', readChange);
                    bookProp.appendChild(yesNoButton);
                }
                else {
                    bookProp.textContent = book[prop];
                }
                bookLine.appendChild(bookProp);
            }
            const dellButton = document.createElement('button');
            dellButton.classList.add('dellButton');
            dellButton.addEventListener('click', deleteBook);
            bookLine.appendChild(dellButton);
            bookContainer.appendChild(bookLine);
        });
    }
}

let myLibrary = new Library;


const newBookButton = document.querySelector('#new-book');
const newBookAdded = document.querySelector('#add-book');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('#now-book-form');

newBookButton.addEventListener('click', openForm);

newBookAdded.addEventListener('click', (event) => {
    const title = document.querySelector('input[name=title]');
    const author = document.querySelector('input[name=author]');
    const pages = document.querySelector('input[name="pages"]');
    const read = document.querySelector('input[name=read]:checked');
    event.preventDefault();
    if (title.validity.valid && author.validity.valid && pages.validity.valid) {
        myLibrary.addBookToLibrary(title.value, author.value, pages.value, read.value);
        closeForm();
        cleanForm();
    }
    else {
        errorMessage(title, author, pages);
    }
});


function openForm() {
    overlay.classList.add('active');
    form.classList.add('active');
}

function closeForm() {
    overlay.classList.remove('active');
    form.classList.remove('active');
}

function cleanForm() {
    document.querySelector('input[name=title]').value = '';
    document.querySelector('input[name=author]').value = '';
    document.querySelector('input[name="pages"]').value = '';
    const newBookRead = document.querySelector('input[name=read]:checked');
    if (newBookRead.value === 'true') {
        newBookRead.checked = false;
        document.querySelector('input[id=read_no]').checked = true;
    }
}

function readChange() {
    let booktoChange =  myLibrary.books[this.parentNode.parentNode.dataset.index];
    if (booktoChange.read === 'true') {
        booktoChange.read = 'false';
    }
    else {
        booktoChange.read = 'true';
    }
    myLibrary.render();
}

function deleteBook() {
    let booktoDelete =  myLibrary.books[this.parentNode.dataset.index];
    myLibrary.books = myLibrary.books.filter(book => book !== booktoDelete);
    myLibrary.render();
}

function errorMessage(title, author, pages) {
    if (!title.validity.valid) {
        title.setCustomValidity('You need to enter a book title.');
    }
    if (!author.validity.valid) {
        author.setCustomValidity('You need to enter a book author.');
    }
    if (!pages.validity.valid) {
        pages.setCustomValidity('You need to enter a number of pages.');
    }
}

window.addEventListener('beforeunload', (e) => {if (myLibrary.setStorage()) e.returnValue = '';});
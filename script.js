let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
}

function addBookToLibrary() {
    const newBookTitle = document.querySelector('input[name=title]').value;
    const newBookAuthor = document.querySelector('input[name=author]').value;
    const newBookPages = document.querySelector('input[name="pages"]').value;
    const newBookRead = document.querySelector('input[name=read]:checked').value;
    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    myLibrary.push(newBook);
    render();
    return (newBook);
  }

  const bookContainer = document.querySelector('#book-conteiner');


function render() {
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookLine = document.createElement('div');
        bookLine.classList.add('book-position');
        for (let prop in book) {
            const bookProp = document.createElement('div');
            if(prop === 'read') {
                const yesNoButton = document.createElement('button');
                if (book[prop]==='true') {
                    yesNoButton.textContent = "Yes";
                    yesNoButton.classList.add('yesButton');
                }
                else {
                    yesNoButton.textContent = "No";
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
        dellButton.addEventListener('click', deleteBook)
        bookLine.appendChild(dellButton);
        bookContainer.appendChild(bookLine);
    });
}

const newBookButton = document.querySelector('#new-book')
const newBookAdded = document.querySelector('#add-book')
const overlay = document.querySelector('#overlay')
const form = document.querySelector('#now-book-form')

newBookButton.addEventListener('click', openForm)

newBookAdded.addEventListener('click', () => {
    addBookToLibrary();
    closeForm();
    cleanForm();
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
    newBookRead.checked = false;
}

function readChange() {;
    if (this.textContent === 'No') {
        this.textContent = 'Yes';
    }
    else {
        this.textContent = 'No';
    }
    this.classList.toggle('yesButton');
    this.classList.toggle('noButton');
}

function deleteBook() {
    const deleteBookTitle = this.parentElement.firstChild.textContent;
    myLibrary = myLibrary.filter(book => book.title !== deleteBookTitle);
    render();
}
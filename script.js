let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
}

function addBookToLibrary() {
    const newBookTitle = document.querySelector('input[name=title]');
    const newBookAuthor = document.querySelector('input[name=author]');
    const newBookPages = document.querySelector('input[name="pages"]');
    const newBookRead = document.querySelector('input[name=read]:checked');
    console.log(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.value);
    /* let newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.value);
    console.log(newBook)
    myLibrary.push(newBook);
    render();
    return (newBook); */
  }

  let bookContainer = document.querySelector('#conteiner');


function render() {
    myLibrary.forEach(book => {
        const bookLine = document.createElement('div');
        bookLine.classList.add('book-position');
        for (let prop in book) {
            const bookProp = document.createElement('div');
            if(prop === 'read') {
                if (book[prop]=== 'true'){
                    bookProp.textContent = "Yes";
                }
                else {
                    bookProp.textContent = "No";
                }
            }
            else {
                bookProp.textContent = book[prop];
            }
            bookLine.appendChild(bookProp);
        }
        const dellButton = document.createElement('button');
        dellButton.classList.add('dellButton');
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
});


function openForm() {
    overlay.classList.add('active');
    form.classList.add('active');
}

function closeForm() {
    overlay.classList.remove('active');
    form.classList.remove('active');
}

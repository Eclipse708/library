const myLibrary = [];
const books = document.querySelector('.books');
const dialog = document.querySelector('dialog');
const addNewBtn = document.querySelector('.showModal');
const submitBtn = document.getElementById('submit');
const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const pageError = document.getElementById('page-error');

class Book {
    constructor(title = "unknown", author = "unknown", page = 0, readStatus = false) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.readStatus = readStatus;
    }
    toggleRead() {
        this.readStatus = !this.readStatus;
    }
}


function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}

function render() {
    books.innerHTML = "";
    myLibrary.forEach((book, i) => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.style.display = 'flex';
    const title = document.createElement('p');
    const author = document.createElement('p');
    const page = document.createElement('p');
    const buttonGroup = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    buttonGroup.classList.add('button-group');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn');

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    page.textContent = `${book.page}`;
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener('click', () => remove(i));
    readBtn.addEventListener('click', () => toggleRead(i))

    if (book.readStatus) {
        readBtn.textContent = 'Read';
        readBtn.classList.add('btn-black');
    } else {
        readBtn.textContent = 'Not read';
        readBtn.classList.add('btn-white');
    }

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(page);
    card.appendChild(readBtn);
    card.appendChild(removeBtn);

    books.appendChild(card);
});
}

function remove(index) {
    myLibrary.splice(index, 1);
    render();
}

showError = (inputName) => {
    if (inputName.value.length === 0) {
        console.log(`${inputName.name} is 0`);
        if (inputName.name === 'book_title') {
            titleError.textContent = 'Title is empty';

        } else if (inputName.name === 'book_author') {
            authorError.textContent = 'Author is empty';
        } else if (inputName.name === 'book_page') {
            inputName.style.border = '1px solid';
            inputName.style.borderColor = 'red';
        }
    } else {
        if (inputName.name === 'book_title') {
            titleError.textContent = '';
            
        } else if (inputName.name === 'book_author') {
            authorError.textContent = '';
        } else if (inputName.name === 'book_page') {
            inputName.style.border = 'none';
        }
    }
}

function addBookToLibrary() {
  
  const form = document.querySelector('form');
  const inputs = document.querySelectorAll('input');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const page = document.getElementById('page'); 
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    inputs.forEach(input => {
        showError(input);
    })

    if (title.value.length === 0) {
        showError(title);
    } else if (author.value.length === 0) {
        showError(author)
    } else if (page.value.length === 0) {
        showError(page)
    } else {
        const newTitle = title.value;
        const newAuthor = author.value;
        const newPage = page.value;
        const readStatus = document.getElementById('readStatus').checked;
        let newBook =  new Book(newTitle, newAuthor, newPage, readStatus);
        myLibrary.push(newBook);
        
        render(); 
        dialog.close();
    }
  });
  addNewBtn.addEventListener('click', function() {
    dialog.showModal();
  })
  
}


addBookToLibrary();


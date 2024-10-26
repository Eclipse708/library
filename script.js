const myLibrary = [];
const books = document.querySelector('.books');
const dialog = document.querySelector('dialog');
const addNewBtn = document.querySelector('.showModal');
const submitBtn = document.getElementById('submit');

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

function addBookToLibrary() {
  
  addNewBtn.addEventListener('click', function() {
    dialog.showModal();
  })
  
  submitBtn.addEventListener('click', (event)=> {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const page = document.getElementById('page').value;
    const readStatus = document.getElementById('readStatus').checked;
    let newBook =  new Book(title, author, page, readStatus);
    myLibrary.push(newBook);
    
    render(); 
    dialog.close();
  });
}


addBookToLibrary();


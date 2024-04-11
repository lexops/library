const myLibrary = [];

const imageNotFound = "assets/book-cover-default.png"

function Book(title, author, coverURL = imageNotFound, wasRead = false) {
    this.title = title;
    this.author = author;
    this.coverURL = coverURL;
    this.wasRead = wasRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const mockBooks = [
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
    },
    {
        "title": "1984",
        "author": "George Orwell",
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
    },
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
    }
];

mockBooks.forEach(book => {
    const newBook = new Book(book.title, book.author);
    addBookToLibrary(newBook);
});

console.log(myLibrary)

// Modify DOM here

const grid = document.querySelector(".grid-container");

// display books

function displayBooks(books) {
    books.forEach(book => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        if (book.wasRead) newCard.classList.add("was-read");

        newCard.innerHTML = `
        <div class="cover">
            <img src="${book.coverURL}" alt=${book.title}>
        </div>
        <div class="info">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
        </div>`

        grid.appendChild(newCard)
    })
}

displayBooks(myLibrary);

// Add Book Dialog

const dialog = document.querySelector("dialog");
const addBooksBtn = document.querySelector(".add-books");
const closeModalBtn = document.querySelector(".close-modal");
const submitDialogBtn = document.querySelector("dialog button[type='submit']");

addBooksBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e)
    title.value = "";
    author.value = "";
    dialog.close();
});

submitDialogBtn.addEventListener("click", (event) => {
    // event.preventDefault();

    let title = document.querySelector("input#title");
    let author = document.querySelector("input#author");
    let wasRead = document.querySelector("input[type='checkbox']");

    const newBook = new Book(title.value, author.value, imageNotFound, wasRead.checked);
    addBookToLibrary(newBook);

    console.log(myLibrary);
    displayBooks([newBook]);

    title.value = "";
    author.value = "";

    dialog.close(newBook);
});

// Delete book buttons

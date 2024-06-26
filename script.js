const myLibrary = [];

const imageNotFound = "assets/book-cover-default.png"

class Book{
    constructor(title, author, coverURL = imageNotFound, wasRead = false)  {
        this.title = title;
        this.author = author;
        this.coverURL = coverURL;
        this.wasRead = wasRead;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const mockBooks = [
    {
        "title": "Think Like a Programmer: An Introduction to Creative Problem Solving",
        "author": "V. Anton Spraul",
        "coverURL": "https://m.media-amazon.com/images/I/81vuUsOPM2L._SY342_.jpg"
    },
    {
        "title": "Eloquent Javascript: A Modern Introduction to Programming",
        "author": "Marijn Haverbeke",
        "coverURL": "https://m.media-amazon.com/images/I/41VvIauMuuL._SY445_SX342_.jpg"
    },
    {
        "title": "You don't know JS",
        "author": "Kyle Simpson",
        "coverURL": "https://m.media-amazon.com/images/I/71mKvD89oEL._SL1500_.jpg"
    },
    {
        "title": "The Principles of Object-Oriented Javascript",
        "author": "Nicholas C. Zakas",
        "coverURL": "https://m.media-amazon.com/images/I/81JOSnsABSL._SL1500_.jpg"
    },
    {
        "title": "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        "author": "Sandi Metz",
        "coverURL": "https://images.squarespace-cdn.com/content/v1/5527cdbae4b0ee7b897c2111/1530279450483-K5BJ5TZGMYSWYA3QQA63/POODR_2e_cover_low_res.jpg?format=500w"
    },
    {
        "title": "A Common-Sense Guide to Data Structures and Algorithms: Level Up Your Core Programming Skills",
        "author": "Jay Wengrow",
        "coverURL": "https://pragprog.com/titles/jwdsal2/a-common-sense-guide-to-data-structures-and-algorithms-second-edition/jwdsal2-250.jpg"
    },
];

mockBooks.forEach(book => {
    const newBook = new Book(book.title, book.author, book.coverURL);
    addBookToLibrary(newBook);
});


// Modify DOM here

const grid = document.querySelector(".grid-container");

// display books

function displayBooks(books) {
    books.forEach((book, index) => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.setAttribute("data-index", index);
        if (book.wasRead) newCard.classList.add("was-read");

        newCard.innerHTML = `
        <div class="cover">
            <img src="${book.coverURL}" alt=${book.title}>
        </div>
        <div class="info">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
        </div>
        <button type="button" class="markAsRead">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>mark as read?</title><path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg>
        </button>
        <button type="button" class="deleteBook">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete book?</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
        </button>`

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
    title.value = "";
    author.value = "";
    dialog.close();
});

submitDialogBtn.addEventListener("click", (event) => {
    // event.preventDefault();

    let title = document.querySelector("input#title");
    let author = document.querySelector("input#author");
    let wasRead = document.querySelector("input[type='checkbox']");
    let coverURL = document.querySelector("input#cover-url");

    const newBook = new Book(title.value, author.value, coverURL.value, wasRead.checked);
    addBookToLibrary(newBook);

    displayBooks([newBook]);

    title.value = "";
    author.value = "";

    dialog.close(newBook);
});

// Delete book buttons

grid.addEventListener("click", (e) => {
    const deleteBookBtn = e.target.closest('.deleteBook');

    if (deleteBookBtn) {
        const card = deleteBookBtn.closest('.card')
        const cardIndex = card.attributes["data-index"]
        myLibrary.splice(cardIndex, 1)
        grid.removeChild(card)
    }
})

grid.addEventListener("click", (e) => {
    const markAsRead = e.target.closest('.markAsRead');

    if (markAsRead) {
        const card = markAsRead.closest('.card')
        const cardIndex = card.attributes["data-index"].value
        const book = myLibrary[cardIndex]
        book.wasRead = true;
        card.classList.toggle("was-read")
    }
})
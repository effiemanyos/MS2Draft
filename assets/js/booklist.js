// Book Class: Represents a Book
class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [{ // Pretend this is coming from local storage
                title: 'Book One',
                author: 'John Doe',
                price: '€20'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                price: '€30'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#price').value = '';
    }
}

// Store Class: Handles Local Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const price = document.querySelector('#price').value;

    // Instatiate book
    const book = new Book(title, author, price);

    // Add book to UI
    UI.addBookToList(book);

    // Clear fields
    UI.clearFields()
});

// Event: Remove a Book
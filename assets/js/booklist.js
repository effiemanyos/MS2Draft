// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn, price) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.price}</td>
            <td><a href="#" class="btn btn-sm delete"><i class="fa fa-trash trash-styling"></i></a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); // Insert div before the form
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() { // THIS IS NOT WORKING ANYMORE
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
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
    const isbn = document.querySelector('#isbn').value;
    const price = document.querySelector('#price').value;

    // Validate input has a text
    if (title === '' || author === '' || isbn === '' || price === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn, price);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Success message
        UI.showAlert('The book has been added', 'success'); // THIS IS NOT WORKING ANYMORE

        // Clear fields
        UI.clearFields(); // THIS IS NOT WORKING ANYMORE
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    // Success message
    UI.showAlert('The book has been removed', 'warning');
});
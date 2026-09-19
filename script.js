// ========================================
// LIBRARY BOOK RECORD APPLICATION
// ========================================


// Store all books in an array
let books = [];


// Get elements from HTML
const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");
const searchInput = document.getElementById("searchInput");

const totalBooks = document.getElementById("totalBooks");
const availableBooks = document.getElementById("availableBooks");
const issuedBooks = document.getElementById("issuedBooks");
const categories = document.getElementById("categories");


// ========================================
// ADD BOOK
// ========================================

bookForm.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();

    // Get values from form
    const id = document.getElementById("bookId").value.trim();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("author").value.trim();
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;


    // Check if Book ID already exists
    const existingBook = books.find(function(book) {
        return book.id.toLowerCase() === id.toLowerCase();
    });


    if (existingBook) {
        alert("A book with this ID already exists!");
        return;
    }


    // Create new book object
    const newBook = {
        id: id,
        title: title,
        author: author,
        category: category,
        status: status
    };


    // Add book to array
    books.push(newBook);


    // Display books
    displayBooks(books);


    // Update statistics
    updateStatistics();


    // Clear the form
    bookForm.reset();


    // Show success message
    alert("Book added successfully! 📚");

});


// ========================================
// DISPLAY BOOKS
// ========================================

function displayBooks(bookList) {

    // Clear existing table rows
    bookTable.innerHTML = "";


    // Check if there are no books
    if (bookList.length === 0) {

        bookTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px;">
                    No books found 📚
                </td>
            </tr>
        `;

        return;
    }


    // Add every book to the table
    bookList.forEach(function(book) {

        const row = document.createElement("tr");


        // Create status class
        const statusClass =
            book.status.toLowerCase() === "available"
                ? "available"
                : "issued";


        row.innerHTML = `
            <td>${book.id}</td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>
                <span class="status ${statusClass}">
                    ${book.status}
                </span>
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteBook('${book.id}')">
                    🗑 Delete
                </button>
            </td>
        `;


        bookTable.appendChild(row);

    });

}


// ========================================
// DELETE BOOK
// ========================================

function deleteBook(bookId) {

    // Ask user for confirmation
    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );


    if (!confirmDelete) {
        return;
    }


    // Remove book from array
    books = books.filter(function(book) {
        return book.id !== bookId;
    });


    // Display updated books
    displayBooks(books);


    // Update statistics
    updateStatistics();

}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    // Total number of books
    totalBooks.textContent = books.length;


    // Count available books
    const available = books.filter(function(book) {
        return book.status === "Available";
    }).length;


    availableBooks.textContent = available;


    // Count issued books
    const issued = books.filter(function(book) {
        return book.status === "Issued";
    }).length;


    issuedBooks.textContent = issued;


    // Find unique categories
    const uniqueCategories = new Set(
        books.map(function(book) {
            return book.category;
        })
    );


    categories.textContent = uniqueCategories.size;

}


// ========================================
// SEARCH BOOKS
// ========================================

searchInput.addEventListener("input", function() {

    // Get search text
    const searchText = searchInput.value
        .toLowerCase()
        .trim();


    // Filter books
    const filteredBooks = books.filter(function(book) {

        return (
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText) ||
            book.category.toLowerCase().includes(searchText) ||
            book.id.toLowerCase().includes(searchText)
        );

    });


    // Display matching books
    displayBooks(filteredBooks);

});


// ========================================
// INITIAL DISPLAY
// ========================================

displayBooks(books);
updateStatistics();
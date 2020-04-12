document.getElementById('BookInputForm').addEventListener('submit', saveBook);

function saveBook(e) {
  var bookName = document.getElementById('BookNameInput').value;
  var bookGenre = document.getElementById('BookGenreInput').value;
  var bookAuthor = document.getElementById('AuthorInput').value;
  var bookId = chance.guid();

  var book = {
    id: bookId,
    name : bookName,
    genre: bookGenre,
    author: bookAuthor

  }

  if (localStorage.getItem('books') == null) {
    var books = [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    var books = JSON.parse(localStorage.getItem('books'));
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  document.getElementById('BookInputForm').reset();

  fetchBooks();

  e.preventDefault();
}

function setStatusClosed(id) {
  var books = JSON.parse(localStorage.getItem('books'));

  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i].status = 'Closed';
    }
  }

  localStorage.setItem('books', JSON.stringify(books));

  fetchBooks();
}

function deleteBook(id) {
  var books = JSON.parse(localStorage.getItem('books'));

  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books.splice(i, 1);
    }
  }

  localStorage.setItem('books', JSON.stringify(books));

  fetchBooks();
}

function fetchBooks() {
  var books = JSON.parse(localStorage.getItem('books'));
  var bookListe = document.getElementById('bookList');

  bookListe.innerHTML = '';

  for (var i = 0; i < books.length; i++) {
    var id = books[i].id;
    var name = books[i].name;
    var genre = books[i].genre;
    var author = books[i].author;
   

    bookListe.innerHTML +=   '<div class="well">'+
                              '<h6>Book ID: ' + id + '</h6>'+
                             
                              '<h3>' + name + '</h3>'+
                              '<p><span class="glyphicon glyphicon-book"></span> ' + genre + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + author+ '</p>' +
                              '<a href="#" onclick="deleteBook(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
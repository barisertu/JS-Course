class Book {
  constructor(title, author, isbn){
    this.title = title;
    this. author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = ` 
    <td>${book.title}</td>
    <td>${book.author}</td> 
    <td>${book.isbn}</td> 
    <td><a href="#" class="delete">X</a></td>
    `;
  (
    list.appendChild(row));
  }

  showAlert(message, className){
  //Create div
  const div = document.createElement('div');
  div.className = `alert ${className}`

  //addText
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  //Get form
  const form = document.getElementById('book-form');
  //Insert alert
  container.insertBefore(div, form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000)
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  checkFields(book){
    const ui = new UI();
    if(book.title != '' && book.author != '' &&  book.isbn != ''){
      return true;
      
    }else {
      return false;
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Event Listeners for adding books
document.getElementById('book-form').addEventListener('submit', function(e){
 
  //Get form Values
  const title   = document.getElementById('title').value,
        author  = document.getElementById('author').value,
        isbn    = document.getElementById('isbn').value;

  //Instantiate Book Obj
  const book = new Book(title, author, isbn);

  //Instantiate UI Obj
  const ui = new UI();

  //Add book to list
  if(ui.checkFields(book) === true){
      ui.addBookToList(book);
      ui.showAlert(`Book successfully added to list!`, `success`);

      //Clear fields
      ui.clearFields();
  }else {
    ui.showAlert(`All fields are mandatory!`, `error`);
  }
  e.preventDefault();
});

//Event Listeners for deleting books
document.getElementById('book-list').addEventListener('click', function(e){

  //Instantiate the UI
  const ui = new UI();
  ui.deleteBook(e.target);

  //Show alert
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
})

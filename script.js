const bookInput = document.querySelector(".book");
const pagesInput = document.querySelector(".pages");
const authorInput = document.querySelector(".author");
const checkStatus = document.querySelector(".read-status");

let bookArr = [], bookUid = [], checked;

function Book(name, pages, author, read) {
    this.name = name;
    this.pages = pages;
    this.author = author;
    this.read = read;
}

Book.prototype.getUid = function() {
    this.uid = crypto.randomUUID();
    bookUid.push(this.uid);
}

const Button = document.querySelector(".button");
Button.addEventListener("click", () => {
    if(checkStatus.checked == true){
        checked = "yes";
    }
    else {
        checked = "no";
    }
    let book = new Book(bookInput.value, pagesInput.value, authorInput.value, checked);
    book.getUid();
    bookArr.push(book);
});
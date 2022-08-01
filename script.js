class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
let myLibrary = [];

const bookCase = document.querySelector(".bookcase");
const addBtn = document.querySelector(".add");
const submit = document.getElementById("submit");
const information = document.getElementById("information");
const closeBtn = document.getElementById("close");
const background = document.getElementById("background");

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("checkbox");

// clear input
const clearInput = () => {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
  information.classList.remove("active");
  background.classList.remove("active");
};

const getInputFromUser = () => {
  let titleValue;
  let authorValue;
  let pagesValue;
  let readValue;

  if (createPopUp()) {
    titleValue = title.value;
    authorValue = author.value;
    pagesValue = pages.value;

    if (read.checked) readValue = true;
    if (!read.checked) readValue = false;

    let newBooks = new Book(titleValue, authorValue, pagesValue, readValue);
    myLibrary.push(newBooks);
    createBook(newBooks);

    console.log(myLibrary);
  }
};

// show pop up if the user have an input blank
const createPopUp = () => {
  const popUpTitle = document.querySelector(".popup-title");
  const popUpAuthor = document.querySelector(".popup-author");
  const popUpPages = document.querySelector(".popup-pages");

  title.onclick = () => popUpTitle.classList.remove("active");
  author.onclick = () => popUpAuthor.classList.remove("active");
  pages.onclick = () => popUpPages.classList.remove("active");

  if (title.value == "") popUpTitle.classList.add("active");
  if (author.value == "") popUpAuthor.classList.add("active");
  if (pages.value == "") popUpPages.classList.add("active");

  if (title.value != "" && author.value != "" && pages.value != "") return true;
};

const toggleRead = (e) => {
  if (e.target.textContent == "READ") {
    e.target.textContent = "NOT READ";
  } else {
    e.target.textContent = "READ";
  }

  e.target.classList.toggle("read");
  e.target.classList.toggle("notread");
};

const createBook = (books) => {
  const bookCard = document.createElement("div");
  const Title = document.createElement("h2");
  const Author = document.createElement("h3");
  const Pages = document.createElement("p");
  const button = document.createElement("div");
  const readBtn = document.createElement("div");
  const delBtn = document.createElement("div");

  bookCard.classList.add("book");
  button.classList.add("button");
  delBtn.classList.add("delete");
  delBtn.classList.add("hoverable");
  readBtn.classList.add("hoverable");
  Title.classList.add("title");

  Title.textContent = books.title;
  Author.textContent = books.author;
  Pages.textContent = `${books.pages} Pages`;
  delBtn.textContent = "DELETE";

  if (books.read) {
    readBtn.textContent = "READ";
    readBtn.classList.add("read");
  }
  if (!books.read) {
    readBtn.textContent = "NOT READ";
    readBtn.classList.add("notread");
  }

  delBtn.addEventListener("click", (e) => {
    let index = myLibrary.findIndex((items) => {
      return items.title == Title.textContent;
    });
    myLibrary.splice(index, 1);
    bookCase.removeChild(e.target.parentNode.parentNode);
  });
  readBtn.addEventListener("click", toggleRead);

  bookCard.append(Title);
  bookCard.append(Author);
  bookCard.append(Pages);
  button.append(readBtn);
  button.append(delBtn);
  bookCard.append(button);
  bookCase.append(bookCard);
  clearInput();
};

closeBtn.onclick = () => clearInput();
submit.onclick = () => getInputFromUser();
addBtn.onclick = () => {
  information.classList.add("active");
  background.classList.add("active");
};

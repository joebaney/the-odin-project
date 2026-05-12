// We need to grab the elements from the DOM
// We need a function to create new books
// We need to store the books in an array
// We need to access the modal by using onClick on the New Book button
// When the modal is open, make sure cancel closes modal
// Make sure that we're getting the form information onSubmit
// Take that form info, pass it as a new object into the array
// Toggle the "Read" button, so that it shows as "Read", if it's true, or "Unread" if it's false
// Delete button functionality, just splice that book out by its index. Find a way to reload array

// What we need DOM-wise
// ---We need the container
// ---We need the New Book button to open the modal
// ---We need the Add Book/Close Book buttons IN the Modal
// ---We need the form that's IN the modal
// ---We need the card's container
// ---We need the card
// ---We need the Read/Delete Buttons on the card

// Grab DOM
const container = document.querySelector(".container");
const modalBtn = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const closeBtn = document.getElementById("close-modal");
const cardContainer = document.getElementById("card-container");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

modalBtn.addEventListener("click", () => {
  modal.showModal();
});

closeBtn.addEventListener("click", () => {
  modal.close();
});

let library = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: true,
  },

  {
    title: "Dune",
    author: "Frank Herbert",
    pages: 688,
    read: false,
  },

  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    read: true,
  },

  {
    title: "Dracula",
    author: "Bram Stoker",
    pages: 418,
    read: false,
  },

  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    pages: 662,
    read: true,
  },

  {
    title: "Mistborn",
    author: "Brandon Sanderson",
    pages: 541,
    read: false,
  },
];

const createBook = (title, author, pages, read) => {
  return {
    title,
    author,
    pages,
    read,
  };
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let titleValue = titleInput.value;
  let authorValue = authorInput.value;
  let pagesValue = pagesInput.value;
  let readValue = readInput.checked;

  let newBook = createBook(titleValue, authorValue, pagesValue, readValue);
  library.push(newBook);
  modal.close();
  console.log(library);
  renderUpdate(library);
});

const renderUpdate = (arr) => {
  cardContainer.innerHTML = "";
  arr.forEach((item, index) => {
    const card = document.createElement("div");
    const cardTitle = document.createElement("h2");
    const cardAuthor = document.createElement("h3");
    const cardPages = document.createElement("p");
    const cardRead = document.createElement("button");
    const cardDelete = document.createElement("button");

    card.id = "card";
    cardDelete.classList.add("delete");

    cardRead.addEventListener("click", () => {
      item.read = !item.read;
      renderUpdate(library);
    });

    cardDelete.addEventListener("click", () => {
      library.splice(index, 1);
      renderUpdate(library);
    });

    cardTitle.textContent = `Title: ${item.title}`;
    cardAuthor.textContent = `Author: ${item.author}`;
    cardPages.textContent = `Page Count: ${item.pages}`;
    cardDelete.textContent = `Delete Book`;

    if (item.read) {
      cardRead.textContent = `${"Read"}`;
      cardRead.classList.add("read");
    } else {
      cardRead.textContent = `${"Unread"}`;
      cardRead.classList.add("unread");
    }

    card.append(cardTitle, cardAuthor, cardPages, cardRead, cardDelete);
    cardContainer.append(card);
  });
};

renderUpdate(library);

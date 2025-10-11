// Lesson 3 - Events Starter

let quotes = [];
let nextId = 1;

// Select DOM elements
const quoteList = document.getElementById("quote-list");
const form = document.getElementById("quoteForm");
const contentInput = document.getElementById("content");
const authorInput = document.getElementById("author");
const idInput = document.getElementById("quoteId");
const randomBtn = document.getElementById("randomBtn");
const randomDisplay = document.getElementById("randomQuoteDisplay");

function resetForm() {
  idInput.value = "";
  contentInput.value = "";
  authorInput.value = "";
}

function findQuoteById(id) {
  const numId = Number(id);
  return quotes.find((q) => q.id === numId);
}

function createQuoteElement(quote) {
  // a quote element example
  //<section id="quote-list">
  //  <div data-id="1">
  //    <p>Confidence comes from discipline and training</p>
  //    <p>Robert</p>
  //    <button class="edit-btn" data-id="1">
  //      Edit
  //    </button>
  //    <button class="delete-btn" data-id="1">
  //      Delete
  //    </button>
  //  </div>
  // </section>
  const quoteDiv = document.createElement("div");
  quoteDiv.setAttribute("data-id", quote.id);
  quoteDiv.innerHTML = `
        <p>"${quote.content}"</p>
        <p>${quote.author}</p>
        <button class="edit-btn" data-id="${quote.id}">Edit</button>
        <button class="delete-btn" data-id="${quote.id}">Delete</button>
    `;
  return quoteDiv;
}

// Add, edit, delete quote functions

function addQuoteToDOM(quote) {
  quoteList.appendChild(createQuoteElement(quote));
}

function updateQuoteInDOM(quote) {
  const quoteDiv = quoteList.querySelector(`div[data-id="${quote.id}"]`);
  if (quoteDiv) {
    quoteDiv.querySelector("p:first-child").textContent = `"${quote.content}"`;
    quoteDiv.querySelector("p:nth-child(2)").textContent = quote.author;
  }
}

function deleteQuoteFromDOM(id) {
  const quoteDiv = quoteList.querySelector(`div[data-id="${id}"]`);
  if (quoteDiv) {
    quoteList.removeChild(quoteDiv);
  }
}

function addQuote(content, author) {
  const newQuote = { id: nextId++, content, author };
  quotes.push(newQuote);
  addQuoteToDOM(newQuote);
}

function editQuote(id, content, author) {
  const quote = findQuoteById(id);
  if (quote) {
    quote.content = content;
    quote.author = author;
    updateQuoteInDOM(quote);
  }
}

function deleteQuote(id) {
  quotes = quotes.filter((q) => q.id !== Number(id));
  deleteQuoteFromDOM(id);
  if (idInput.value === String(id)) resetForm();
}

function renderQuotes() {
  quoteList.innerHTML = "";
  quotes.forEach(addQuoteToDOM);
}

function showRandomQuote() {
  if (quotes.length === 0) {
    randomDisplay.textContent = "No quotes yet!";
    randomDisplay.style.backgroundColor = "transparent";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  randomDisplay.textContent = `"${randomQuote.content}" — ${randomQuote.author}`;
  randomDisplay.style.backgroundColor = "lightyellow";
}

// Event handlers
function handleFormSubmit(event) {
  event.preventDefault();

  const content = contentInput.value.trim();
  const author = authorInput.value.trim();
  const id = idInput.value;

  if (!content || !author) return;

  if (id) {
    editQuote(id, content, author);
  } else {
    addQuote(content, author);
  }
  resetForm();
}

function handleQuoteListClick(event) {
  const target = event.target;
  const id = target.getAttribute("data-id");

  if (!id) return;

  if (target.classList.contains("edit-btn")) {
    const quoteToEdit = findQuoteById(id);
    if (quoteToEdit) {
      idInput.value = quoteToEdit.id;
      contentInput.value = quoteToEdit.content;
      authorInput.value = quoteToEdit.author;
    }
  } else if (target.classList.contains("delete-btn")) {
    if (confirm("Delete this quote?")) {
      deleteQuote(id);
    }
  }
}

// Event listeners for form submission, edit, and delete clicks
form.addEventListener("submit", handleFormSubmit);
quoteList.addEventListener("click", handleQuoteListClick);
randomBtn.addEventListener("click", showRandomQuote);

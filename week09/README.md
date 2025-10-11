# Lesson 3: DOM Events and Interaction

Students will extend their quote manager by adding full interactivity with forms, buttons, and random quote functionality.  
This lesson connects DOM manipulation with event handling to build a fully interactive app.

## Objectives

Students will

- Use event listeners to respond to:
  - Form submission (Add/Edit)
  - Delete button click
  - Random quote button click
- Update the DOM when changes are made
  This lesson connects the logic from **quote.js** with the user interface in **index.html** using **ui.js**.

# Tasks

## 1. Setup DOM Elements

- Select the following elements from the HTML by `id` and store them in variables:
  - `quote-list` (the container where quotes will be displayed)
  - `form` (the form for adding and updating quotes)
  - `contentInput` (input for the quote content)
  - `authorInput` (input for the quote author)
  - `idInput` (hidden input for editing an existing quote)
  - `randomBtn` (button to show a random quote)
  - `randomDisplay` (element to display a random quote)

---

## 2. Create DOM Manipulate Functions

### `createQuoteElement(quote)`

- Creates a `<div>` element with:
  - A `data-id` attribute for the quote’s `id`.
  - A `<p>` elements for a quote text
  - A `<p>`elements for an author text.
  - An **Edit** button with `data-id`.
  - A **Delete** button with `data-id`.
  - Add an event listener to edit and delete buttons for `click` events.
    - If the clicked element has class `edit-btn`:
      - Find the quote by `id`.
      - Fill the form inputs with that quote’s data.
    - If the clicked element has class `delete-btn`:
      - Call `deleteQuote(id)`.
      - Remove it from both the array and DOM.
  - Returns the `<div>` element.

### `addQuoteToDOM(quote)`

- Uses `createQuoteElement(quote)` to generate a new element.
- Appends the element to `quote-list`.

### `updateQuoteInDOM(quote)`

- Finds the `<div>` element with the same `data-id`.
- Updates its quote with the new content and author.

### `deleteQuoteFromDOM(id)`

- Finds the `<div>` element with the given `data-id`.
- Removes it from the DOM if it exists.

---

## 3. Render All Quotes

### `renderQuotes()`

- Clears the `quote-list`.
- Loops through all quotes from `getAllQuotes()`.
- Calls `addQuoteToDOM()` for each one.

---

## 4. Handle Form Submission

- Add an event listener on the form (`submit` event).
- When the form is submitted:
  - Prevent the default page reload.
  - Read the values from `content`, `author`, and `quoteId`.
  - If both content and author exist:
    - If `quoteId` has a value:
      - Call `updateQuote(id, content, author)`.
      - Update the quote in both the array and DOM.
    - Otherwise:
      - Call `addQuote(content, author)`.
      - Add the new quote to the array and DOM.
  - Reset the form inputs.

---

## 5. Show a Random Quote

### `showRandomQuote()`

- If there are no quotes, display `-- No quotes to show --` in `randomQuoteDisplay`.
- Otherwise:

  - Pick a random quote from the array.
  - Display it in the format:  
    `"content" — author`

- Add an event listener to `randomBtn` so it calls `showRandomQuote()` when clicked.

---

## 6. Initial Render

- Call `renderQuotes()` once at the bottom of the script so that initial quotes are displayed when the page loads.

---

# Test Cases

- Add a new quote and confirm it appears in the list.
- Edit an existing quote and confirm the DOM updates correctly.
- Delete a quote and confirm it disappears from the list.
- Click **Random Quote** and confirm it shows a random quote from the list (or the message if empty).

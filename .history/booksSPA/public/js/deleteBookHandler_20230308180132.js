"use strict";

(function () {
  let inputField;
  let titleField;
  let authorField;
  let genreField;
  let typeField;
  let messageField;
  let submit;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    inputField = document.querySelector("#id");
    titleField = document.querySelector("#name");
    authorField = document.querySelector("#author");
    genreField = document.querySelector("#genre");
    typeField = document.querySelector("#type");
    messageField = document.querySelector("#messagearea");
    submit = document.querySelector("#submit");

    submit.addEventListener("click", send)
  }

  function showBookData(book) {
    titleField.value = book.id;
    authorField.value = book.author;
    genreField.value = book.genre;
    typeField.value = book.type;
  }

  async function send() {
    const id = inputField.value;

    try {
        const options = {
            method: "DELETE",
            mode: "cors"
        }

        const data = await fetch(`http://localhost:4000/api/books/${id}`, options);

        const status = await data.json()

    }
  }
})();

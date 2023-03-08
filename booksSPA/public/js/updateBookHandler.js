"use strict";

(function () {
  let idField;
  let titleField;
  let authorField;
  let genreField;
  let typeField;
  let submit;
  let messageField;
  let searchState = true;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.querySelector("#id");
    titleField = document.querySelector("#name");
    authorField = document.querySelector("#author");
    genreField = document.querySelector("#genre");
    typeField = document.querySelector("#type");
    messageField = document.querySelector("#messagearea");
    submit = document.querySelector("#submit");

    updateFields();

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      send();
    });

    idField.addEventListener("focus", clearAll);

    function updateMessage(message, type) {
      messageField.style.display = "flex";
      messageField.innerHTML = `<p class="error">${message}</p>`;
      messageField.setAttribute("class", type);
    }

    function clearMessage() {
      messageField.innerHTML = "";
      messageField.removeAttribute("class");
    }

    function clearAll() {
      if (searchState) {
        clearFieldValues();
        clearMessage();
      }
    }

    function updateFields() {
      if (searchState) {
        idField.removeAttribute("disabled");
        titleField.setAttribute("disabled", true);
        authorField.setAttribute("disabled", true);
        genreField.setAttribute("disabled", true);
        typeField.setAttribute("disabled", true);
      } else {
        idField.setAttribute("disabled", true);
        titleField.removeAttribute("disabled");
        authorField.removeAttribute("disabled");
        genreField.removeAttribute("disabled");
        typeField.removeAttribute("disabled");
      }
    }

    function clearFieldValues() {
      idField.value = "";
      titleField.value = "";
      authorField.value = "";
      genreField.value = "";
      typeField.value = "";
      searchState = true;
      updateFields();
    }

    function updateBook(result) {
      if (result.length === 0) {
        return;
      }

      const book = result[0];
      idField.value = book.id;
      titleField.value = book.name;
      authorField.value = book.author;
      genreField.value = book.genre;
      typeField.value = book.type;
      searchState = false;
      updateFields();
    }

    async function send() {
      try {
        if (searchState) {
          //get computer
          if (idField.value.trim().length > 0) {
            const data = await fetch(
              `http://localhost:4000/api/books/${idField.value}`,
              { mode: "cors" }
            );
            const result = await data.json();
            if (result) {
              if (result.message) {
                updateMessage(result.message, result.type);
              } else {
                updateBook(result);
              }
            }
          }
        } else {
          const book = {
            id: idField.value,
            name: titleField.value,
            author: authorField.value,
            genre: genreField.value,
            type: typeField.value,
          };

          const options = {
            method: "PUT",
            body: JSON.stringify(book),
            headers: { "Content-Type": "application/json" },
            mode: "cors",
          };

          const data = await fetch(
            `http://localhost:4000/api/books/${book.id}`,
            options
          );

          const status = await data.json();

          if (status.message) {
            updateMessage(status.message, status.type);
          }

          searchState = true;
          updateFields();
        }
      } catch (err) {
        updateMessage(err.message, "error");
      }
    }
  }
})();

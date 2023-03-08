"use strict";

(function () {
  let idField;
  let titleField;
  let authorField;
  let genreField;
  let typeField;
  let messageField;
  let submit;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    idField = document.querySelector("#id");
    titleField = document.querySelector("#name");
    authorField = document.querySelector("#author");
    genreField = document.querySelector("#genre");
    typeField = document.querySelector("#type");
    messageField = document.querySelector("#messagearea");
    submit = document.querySelector("#submit");

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      send();
    });
  }

  async function send() {
    const book = {
      id: Number(idField.value),
      name: titleField.value,
      author: authorField.value,
      genre: genreField.value,
      type: typeField.value,
    };
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      };

      const data = await fetch("http://localhost:4000/api/books", options);
      const status = await data.json();

      if (status.message) {
        updateMessage(status.message, status.type);
      }
      clearMessage();
    } catch (err) {
      updateMessage(err.message, "error");
    }

    function updateMessage(message, type) {
      messageField.style.display = "flex";
      messageField.innerHTML = `<p class=error>${message}</p>`;
      messageField.setAttribute("class", type);
    }

    function clearMessage() {
      idField.value = "";
      titleField.value = "";
      authorField.value = "";
      genreField.value = "";
      typeField.value = "";
    }
  }
})();

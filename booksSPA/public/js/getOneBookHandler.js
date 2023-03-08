"use strict";

(function () {
  let results;
  let messageField;
  let id;
  let submit;
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    results = document.querySelector("#data-body");
    id = document.querySelector("#id");
    messageField = document.querySelector("#messagearea");
    submit = document.querySelector("#submit");

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      send();
    });
  }

  async function send() {
    clearMessage();
    results.innerHTML = "";

    try {
      if (id.value.trim().length > 0) {
        const data = await fetch("http://localhost:4000/api/books/", {
          mode: "cors",
        });

        const result = await data.json();

        if (result) {
          if (result.message) {
            updateMessage(result.message, result.type);
          } else {
            updateComputer(result);
          }
        }
      }
    } catch (err) {
      updateMessage(`Data not found. ${err.message}`, "error");
    }
  }

  function updateMessage(message, type) {
    messageField.style.display = "flex";
    messageField.innerHTML = `<p class="error">${message}</p>`;
    messageField.setAttribute("class", type);
  }

  function clearMessage() {
    messageField.textContent = "";
    messageField.removeAttribute("class");
  }

  function updateComputer(result) {
    const book = result.filter((el) => {
      return el.id === Number(id.value);
    });

    results.innerHTML = `<tr>
          <td>${book[0].id}</td>
          <td>${book[0].name}</td>
          <td>${book[0].author}</td>
          <td>${book[0].genre}</td>
          <td>${book[0].type}</td>
      </tr>`;
  }
})();

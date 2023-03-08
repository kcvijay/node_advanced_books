"use strict";

(function () {
  let inputField;
  let showDataField;
  let titleField;
  let authorField;
  let genreField;
  let typeField;
  let getDataField;
  let messageField;
  let submit;

  inputField = document.querySelector("#id");
  showDataField = document.querySelector("#show-data-field");
  titleField = document.querySelector("#name");
  authorField = document.querySelector("#author");
  genreField = document.querySelector("#genre");
  typeField = document.querySelector("#type");
  getDataField = document.querySelector("#getData");
  messageField = document.querySelector("#messagearea");
  submit = document.querySelector("#submit");

  function clearFields() {
    inputField.value = "";
    titleField.value = "";
    authorField.value = "";
    genreField.value = "";
    typeField.value = "";
  }

  getDataField.addEventListener("click", (e) => {
    e.preventDefault();
    confirmBookData();
  });

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this book data?")) {
      deleteBookData();
      clearFields();
    }
  });

  function updateMessage(message) {
    messageField.style.display = "flex";
    messageField.innerHTML = `<p>${message}</p>`;
  }

  async function confirmBookData() {
    const id = inputField.value;

    try {
      if (inputField.value.trim().length > 0) {
        const data = await fetch(`http://localhost:4000/api/books/${id}`, {
          mode: "cors",
        });

        const result = await data.json();
        console.log(result);

        if (!result) {
          updateMessage("Something went wrong with the program.");
        } else {
          if (!result.message) {
            showBookData(result[0]);
          } else {
            updateMessage(result.message);
          }
        }

        function showBookData(book) {
          showDataField.style.display = "grid";
          submit.style.display = "block";
          titleField.value = book.name;
          authorField.value = book.author;
          genreField.value = book.genre;
          typeField.value = book.type;
        }
      } else {
        alert("Please insert book ID first.");
      }
    } catch (err) {
      updateMessage(err.message, "error");
    }
  }

  async function deleteBookData() {
    const id = inputField.value;

    try {
      const options = {
        method: "DELETE",
        mode: "cors",
      };

      const data = await fetch(
        `http://localhost:4000/api/books/${id}`,
        options
      );

      const result = await data.json();

      if (result.message) {
        updateMessage(result.message);
        showDataField.style.display = "none";
        submit.style.display = "none";
        inputField.value = "";
      }
    } catch (err) {
      updateMessage(err.message, "Error");
    }
  }
})();

"use strict";

(function () {
  let inputField;
  let titleField;
  let authorField;
  let genreField;
  let typeField;
  let getDataField;
  let messageField;
  let submit;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    inputField = document.querySelector("#id");
    titleField = document.querySelector("#name");
    authorField = document.querySelector("#author");
    genreField = document.querySelector("#genre");
    typeField = document.querySelector("#type");
    getDataField = document.querySelector("#getData");
    messageField = document.querySelector("#messagearea");
    submit = document.querySelector("#submit");

    getDataField.addEventListener("submit", (e) => {
      e.preventDefault();
      confirmBookData();
    });

    async function confirmBookData() {
      const id = inputField.value;

      try {
        const options = {
          method: "GET",
          mode: "cors",
        };

        const data = await fetch(
          `http://localhost:4000/api/books/${id}`,
          options
        );

        const result = data.json();
        console.log(result);

        // showBookData(result);

        function showBookData(book) {
          titleField.value = book.name;
          authorField.value = book.author;
          genreField.value = book.genre;
          typeField.value = book.type;
        }

        // if (result) {
        //   if (result.message) {
        //     updateMessage(result.message, result.type);
        //   } else {
        //     showBookData(result);
        //   }
        // }
      } catch (err) {
        updateMessage(err.message, "error");
      }
    }

    // async function send() {
    //   const id = inputField.value;

    //   try {
    //     const options = {
    //       method: "DELETE",
    //       mode: "cors",
    //     };

    //     const data = await fetch(
    //       `http://localhost:4000/api/books/${id}`,
    //       options
    //     );

    //     const result = await data.json();
    //     showBookData(result);

    //     console.log(result);

    //     //   if (result) {
    //     //     if (result.message) {
    //     //       updateMessage(result.message, result.type);
    //     //     } else {
    //     //       showBookData(result);
    //     //     }
    //     //   }
    //   } catch (err) {
    //     updateMessage(err.message, "error");
    //   }
    // }

    function updateMessage(message, type) {
      messageField.style.display = "flex";
      messageField.innerHTML = `<p class="error>${message}</p>`;
      messageField.setAttribute("class", type);
    }
  }
})();

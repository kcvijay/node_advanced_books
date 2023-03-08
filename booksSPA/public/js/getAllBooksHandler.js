"use strict";

(function () {
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      const data = await fetch("http://localhost:4000/api/books", {
        mode: "cors",
      });
      const books = await data.json();

      const results = document.querySelector("#data-body");

      for (const book of books) {
        const tr = document.createElement("tr");
        tr.appendChild(createCell(book.id));
        tr.appendChild(createCell(book.name));
        tr.appendChild(createCell(book.author));
        tr.appendChild(createCell(book.genre));
        tr.appendChild(createCell(book.type));
        results.appendChild(tr);
      }
    } catch (err) {
      document.querySelector(
        "#messagearea"
      ).innerHTML = `<p class="error-message">${err.message}</p>`;
    }
  }

  /****/

  function createCell(data) {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
  }
})();

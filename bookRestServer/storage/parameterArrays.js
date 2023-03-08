"use strict";

const toInsertArray = (book) => [
  +book.id,
  book.name,
  book.author,
  book.genre,
  book.type,
];

const toUpdateArray = (book) => [
  book.name,
  book.author,
  book.genre,
  book.type,
  +book.id,
];

module.exports = { toInsertArray, toUpdateArray };

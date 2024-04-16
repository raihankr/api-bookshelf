import { nanoid } from 'nanoid';
import books from './books.js';

/** @type {import("@hapi/hapi").Lifecycle.Method} */
export const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(21);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. '
        + 'readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(book);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: { bookId: id },
  }).code(201);
};

/** @type {import("@hapi/hapi").Lifecycle.Method} */
export const getAllBooks = (request, h) => {
  const {
    name,
    reading,
    finished,
  } = request.query;

  let filteredBooks = books
    .filter((value) => value.name.match(new RegExp(name, 'i')));
  if (reading) {
    filteredBooks = filteredBooks
      .filter((value) => (Number(reading) ? value.reading : !value.reading));
  }
  if (finished) {
    filteredBooks = filteredBooks
      .filter((value) => (Number(finished) ? value.finished : !value.finished));
  }

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((value) => ({
        id: value.id,
        name: value.name,
        publisher: value.publisher,
      })),
    },
  });
};

/** @type {import('@hapi/hapi').Lifecycle.Method} */
export const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((value) => value.id === id)[0];

  if (book) {
    return h.response({
      status: 'success',
      data: { book },
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

/** @type {import('@hapi/hapi').Lifecycle.Method} */
export const updateBook = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const book = books.filter((value) => value.id === id)[0];

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. '
        + 'readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  if (book) {
    Object.assign(book, {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    });

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

/** @type {import('@hapi/hapi').Lifecycle.Method} */
export const deleteBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((value) => value.id === id);

  if (books[index]) {
    books.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

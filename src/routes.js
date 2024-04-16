import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from './handlers.js';

export default [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
  },
];

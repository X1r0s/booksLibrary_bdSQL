import pool from './db.js'

const showAllBooks = async () => {   // 1. Показать все книги
    const result = await pool.query(  
    `SELECT books.title, authors.name AS author
    FROM books
    JOIN authors ON books.author_id = authors.id`
    )
     return result.rows
}

const showAllAuthors = async () => { // 2. Показать всех авторов
    const result = await pool.query(
    `SELECT authors.name, books.title AS book
    FROM authors
    JOIN books ON authors.id = books.author_id`
    )
     return result.rows
}

const addBook = async (title, authorName) => { // 3. Добавить книгу
    // Найти ID автора чтобы привязать к нему значение новой книги
    const author = await pool.query(
      `SELECT id FROM authors WHERE name = $1`,
      [authorName]
    )

    let authorId;
    if (author.rows.length === 0) {
      // Если автора нет, следует добавить его
      const newAuthor = await pool.query(
        `INSERT INTO authors (name) VALUES ($1) RETURNING id`,
        [authorName]
      )
      authorId = newAuthor.rows[0].id
    } else {
      authorId = author.rows[0].id
    }
  
    // Добаввляем саму книгу
    const result = await pool.query(
      `INSERT INTO books (title, author_id) VALUES ($1, $2) RETURNING *`,
      [title, authorId]
    )
    return result.rows[0]
  }

  const editBook = async (title, authorName) => { // 4. Редактировать книгу
    // Ищем ID автора
    const author = await pool.query(
      `SELECT id FROM authors WHERE name = $1`,
      [authorName]
    )

    let authorId;
    if (author.rows.length === 0) {
      // Если автора нет, добавляем его
      const newAuthor = await pool.query(
        `INSERT INTO authors (name) VALUES ($1) RETURNING id`,
        [authorName]
      )
      authorId = newAuthor.rows[0].id
    } else {
      authorId = author.rows[0].id
    }
  
    // Добавить книгу
    const result = await pool.query(
      `UPDATE books SET author_id = $2 WHERE title = $1 RETURNING *`,
      [title, authorId]
    )
    return result.rows[0]
  }
  

    const deleteBook = async (title) => { // 5. Удалить книгу
        const result = await pool.query(
        `DELETE FROM books WHERE title = $1 RETURNING *`,
        [title]
        )
        return result.rows[0]
    }

    const deleteAuthor = async (authorName) => { // 6. Удалить автора
        const result = await pool.query(
            `DELETE FROM authors WHERE name = $1 RETURNING *`,
            [authorName]
        )
        return result.rows[0]
    }

    const exit = async () => {  // 0 .Выйти
        pool.end()
    }   

    export { showAllBooks, showAllAuthors, addBook, editBook, deleteBook, deleteAuthor, exit }
    // Экспортируем все наши функции для использования в основном файле main.js

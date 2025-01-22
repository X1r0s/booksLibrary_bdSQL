/**
 * Отображаем меню и обрабатываем ввод пользователя.
 * 
 * Опции меню:
 * 1. Показать все книги
 * 2. Показать всех авторов
 * 3. Добавить книгу
 * 4. Редактировать книгу
 * 5. Удалить книгу
 * 6. Удалить автора
 * 0. Выйти
 * 
 * В зависимости от выбора пользователя, выполняет соответствующие действия:
 * - Показ всех книг
 * - Показ всех авторов
 * - Добавление книги
 * - Редактирование книги
 * - Удаление книги
 * - Удаление автора
 * - Выход из программы
 */

import { showAllBooks, showAllAuthors, addBook, editBook, deleteBook, deleteAuthor, exit } from './functions.js'
import readline from 'readline' // Импортируем функции и библиотеки

const rl = readline.createInterface({
    input: process.stdin, // Поток ввода (клавиатура)
    output: process.stdout // Поток вывода (консоль)
})

const menu = () => {
    console.log(`
    1. Показать все книги
    2. Показать всех авторов
    3. Добавить книгу
    4. Редактировать книгу
    5. Удалить книгу
    6. Удалить автора
    0. Выйти`)

    rl.question('Введите нужное значение 0-6 в консоль: ', async (answer) => {
        switch (answer.trim()) {
            case '1':
                console.log('Все книги:')
                const books = await showAllBooks()  // Получаем все книги
                console.log(books)  // Просто выводим все книги
                books.forEach(book => {
                    console.log(`${book.title} - ${book.author}`)  
                })
                menu()
                break

            case '2':
                console.log('Всё собрание авторов:')
                const authors = await showAllAuthors()
                authors.forEach (author => {
                    console.log(`${author.name}`)
                })
                menu()
                break

            case '3':
                console.log('Добавление книги:')
                rl.question('Введите название книги: ', (title) => {
                    rl.question('Введите автора книги: ', async (author) => {
                        await addBook(title, author)
                        console.log('Книга успешно добавлена')
                        menu()
                    })
                })
                break

            case '4':
                console.log('Редактирование книги:')
                rl.question('Введите название книги: ', (title) => {
                    rl.question('Введите нового автора книги: ', async (author) => {
                        await editBook(title, author)
                        console.log('Книга успешно отредактирована')
                        menu()
                    })
                })
                break

            case '5':
                console.log('Удаление книги:')
                rl.question('Введите название книги: ', async (title) => {
                    await deleteBook(title)
                    console.log('Книга успешно удалена')
                    menu()
                })
                break

            case '6':
                console.log('Удаление автора:')
                rl.question('Введите автора: ', async (author) => {
                    await deleteAuthor(author)
                    console.log('Автор успешно удалён')
                    menu()
                })
                break

            case '0':
                console.log('Выход из программы')
                await exit()
                rl.close()
                break

            default:
                console.log('Неверный ввод. Попробуйте снова.')
                menu()
                break
        }
    })
}

menu()

import 'dotenv/config'; // Подключаем переменные окружения
import pkg from 'pg'; // Импортируем весь модуль pg

const { Pool } = pkg; // Деструктурируем Pool из объекта

// Создаём пул соединений
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Читаем строку подключения из .env
});

// Функция для проверки подключения
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()'); // Тестовый запрос
    console.log('Подключение успешно:', res.rows[0]);
  } catch (err) {
    console.error('Ошибка подключения:', err.message);
  }
};

// Тестируем подключение
testConnection();

// Экспортируем пул для использования в других частях приложения
export default pool;

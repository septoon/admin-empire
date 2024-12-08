# Админ-панель для "Империи Сияния"

## 📖 Описание

**Админ-панель для "Империи Сияния"** — это удобный инструмент, созданный для управления всеми элементами сайта салона красоты. С её помощью можно изменять описание услуг, обновлять цены, редактировать контактную информацию, график работы, задавать акции, добавлять изображения и многое другое. Она разработана как Telegram Mini App и работает исключительно внутри Telegram.

---

## ✨ Основные функции

- 💅 **Управление услугами**: добавление, редактирование и удаление услуг.
- 🛒 **Управление ценами**: обновление стоимости услуг.
- 📊 **Контроль контента**: редактирование текста на сайте, включая контактную информацию и график работы.
- 📸 **Управление галереей**: добавление и удаление изображений.
- 📈 **Статистика**: просмотр основных метрик, таких как популярные услуги (в разработке).

---

## 💻 Используемые технологии

- **Frontend**:
  - [React](https://reactjs.org/) — библиотека для создания пользовательского интерфейса.
  - [Material-UI (MUI)](https://mui.com/) — для создания компонентов интерфейса.
  - [PrimeReact](https://primereact.org/) — для таблиц и дополнительных UI-компонентов.
  - [Framer Motion](https://www.framer.com/motion/) — для анимации интерфейса.
- **State Management**:
  - [Redux Toolkit](https://redux-toolkit.js.org/) — управление состоянием приложения.
- **Библиотеки**:
  - [Axios](https://axios-http.com/) — для работы с API.
  - [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) — уведомления в приложении.
  - [TWA SDK](https://github.com/TWA-dev/sdk) — инструменты для интеграции с Telegram Mini App.
- **CSS**:
  - [Tailwind CSS](https://tailwindcss.com/) — для стилизации интерфейса.
- **Переменные окружения**:
  - Используются для настройки API и других параметров.

---

## ⚙️ Установка и запуск

### 1️⃣ Клонирование репозитория

```bash
git clone https://github.com/septoon/admin-empire.git
cd admin-empire
```
### 2️⃣ Установка зависимостей
```bash
npm install
```
### 3️⃣ Настройка переменных окружения

Создайте файл .env.local в корне проекта и добавьте следующие переменные окружения:
```bash
REACT_APP_URL=https://example.ru
REACT_APP_ID=your_telegram_id
```
⚠️ Примечание: Проект не будет работать без корректных данных API, токенов Telegram и вне Telegram Mini App.

### 4️⃣ Запуск в режиме разработки
```bash
npm start
```
### 5️⃣ Сборка для продакшена
```bash
npm run build
```
Собранные файлы будут находиться в папке build/ и предназначены для размещения на сервере.

### 🗂 Структура проекта
```bash
admin-empire/
│
├── public/                # Публичные ресурсы (иконки, изображения)
│
├── src/                   # Основные исходные файлы
│   ├── assets/            # Вспомогательные ресурсы
│   │   └── img/           # Изображения
│   ├── common/            # Общие утилиты и функции
│   ├── components/        # Компоненты интерфейса
│   ├── App.css            # Основные стили приложения
│   ├── App.js             # Главная точка входа в приложение
│   ├── custom.css         # Пользовательские стили
│   ├── index.css          # Индексные стили
│   ├── index.js           # Точка входа для React
│   ├── logo.svg           # Логотип
│   └── setupTests.js      # Настройка тестирования
│
├── .env.local             # Файл переменных окружения
├── .gitignore             # Исключения для Git
├── package-lock.json      # Версии установленных пакетов
├── package.json           # Зависимости и скрипты
├── postcss.config.js      # Конфигурация PostCSS
└── tailwind.config.js     # Конфигурация Tailwind CSS
```
### 📦 Зависимости

Основные зависимости указаны в package.json

### 🔏 Лицензия

Проект является частной разработкой и используется для управления сайтом ресторана “Шашлычный дом”.
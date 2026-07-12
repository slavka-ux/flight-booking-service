# ✈️ Flight Booking Service

Повноцінний веб-сервіс для пошуку та бронювання авіаквитків. Проєкт складається з клієнтської частини (Frontend) та серверної частини з базою даних (Backend).

Сайт: https://slavka-ux.github.io/

## 👥 Команда проєкту (Ролі)

1. **Frontend Developer**
   - Розробка користувацького інтерфейсу на React.
   - Налаштування роутингу, станів (Zustand) та взаємодії з API.
2. **Database & Backend Engineer**
   - Проєктування бази даних (SQLite + Prisma).
   - Розробка REST API на Node.js (Express) для рейсів, бронювань та користувачів.
3. **QA Automation & Security Engineer** (kib25-kyakovchuk-lab)
   - Налаштування захисту бекенду (Helmet, Rate Limiting, Validation).
   - Написання API тестів (Jest + Supertest) та E2E тестів (Cypress).

## 🚀 Технологічний стек

- **Frontend:** React, TypeScript, Vite, Zustand, Axios, React Router.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM.
- **База даних:** SQLite.
- **Тестування та QA:** Jest, Supertest, Cypress.
- **Безпека:** Helmet, Express Rate Limit.

---

## 🛠️ Як запустити проєкт локально

Щоб запустити проєкт, вам потрібно відкрити **два термінали** (один для бекенду, інший для фронтенду).

### 1. Запуск серверної частини (Backend)
Відкрийте перший термінал та перейдіть у папку бекенду:
```bash
cd backend
npm install
npm run dev
```
> *Примітка: База даних SQLite налаштується автоматично завдяки скриптам генерації Prisma.*

### 2. Запуск клієнтської частини (Frontend)
Відкрийте другий термінал у головній папці проєкту:
```bash
npm install
npm run dev
```
> Клієнтська частина запуститься автоматично. Відкрийте посилання, яке з'явиться у вашому терміналі, у браузері.

---

## 🧪 Як запускати тести (QA)

### Тестування API (Backend)
Для перевірки логіки сервера, реєстрації та пошуку рейсів:
```bash
cd backend
npx jest
```

### Автоматизоване візуальне тестування (Frontend)
Для запуску скрипта, який симулює реального користувача у браузері:
```bash
npx cypress open
```
У вікні, що з'явиться, виберіть **E2E Testing** та запустіть файли `login.cy.ts` або `bookingFlow.cy.ts`.

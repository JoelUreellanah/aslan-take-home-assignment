# 🎬 Aslan Product-Offer App

Build a simple, full-stack, product offer list application that allows users to see
product offers, filter them and go shopping for them.

---

## Tech Stack

### Frontend

- **React (NextJS)** + **TypeScript**
- **Tailwind CSS**
- **Redux** – state management
- **Axios** – data fetching
- **Vitest** – unit testing examples

### Backend

- **Java** + **Springboot**
- **H2 Database**
- **Unit5 + Mockito** – unit and integration test framework

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js >= 20 (Needed if running locally, without docker)
- Java 21 (Needed if running locally, without docker)
- Docker & Docker Compose

### 1. Clone the repo

```bash
git clone https://github.com/JoelUreellanah/aslan-take-home-assignment.git
cd aslan-take-home-assignment
```

### 2. Run with Docker (Recommended)

```bash
UNSPLASH_API_KEY=<YOUR_UNSPLASH_KEY> docker compose up --build
```

This will spin up **2 containers**: frontend and backend.

💡 Wait until all containers are fully built and running. Usually, the app is ready when you see logs like this:

```
backend-1   | 2025-07-21T17:23:24.867Z  INFO 1 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
backend-1   | 2025-07-21T17:23:24.867Z  INFO 1 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 0 ms
```

Once you see the above, you can access:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

### 3. Local Dev Setup (Optional)

#### Backend

```bash
cd backend
./gradlew bootRun
./gradlew clean test (to run unit/integration test suite)
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
npm run test (to run test suite)
```

---

## Implemented Features

### 🔹 Products List Page

- Responsive grid layout
- Display: `Name`, `created_at`, `wishlist icon`, `avalable offer`
- Sort: by `created_at` (newest / oldest)
- Search: by product name
- Filter by wishlist

### 🔹 Product Creation Page

- Name input (required)
- Offer inputs (optional)
- `created_at` auto-generated

---

## 📘 Assumptions & Trade-offs

- <b>User authentication</b> and <b>authorization</b> are out of scope for this task, but essential for a multi-user production environment. APIs are publicly exposed for simplicity.
- <b>Limited UI Feedback Patterns</b>: While some errors and loading states are handled gracefully, deeper UX improvements like optimistic UI, in-app notifications, or undo actions are omitted due to time constraints. Other example is: error handling is needed when adding a new product (ie. servers are down, product creation takes a long time to complete, real-time completion bar would be required and so on..)
- <b>UI Design Trade-off</b>: The UI prioritizes functional clarity and responsiveness over visual flair. No animations or deep component theming were added, to keep the focus on architecture and core interactivity.
- Minimal end-to-end testing due to time constraints.
- <b>Image handling</b>: A more robust image system is required, for example when the site is accessed on a phone, then smaller size images would need to be queried.
- <b> Found a bug that causes the wishlist items to be displayed correctly when toggling the wishlist button quickly or after several operation. Some more focused investigation is needed on how the query is formed to the server.

---

## 🚀 Future Improvements

If given more time, I would:

- Add full CRUD support (update/delete products)
- Add authentication and user-specific dashboards
- Improve error boundaries and retry logic
- Implement full E2E testing with **Cypress**
- Add advanced search (fuzzy search, debounce)
- Allow tag suggestions/autocomplete
- Improve accessibility (ARIA roles, screen reader testing)

---

## 👋 Conclusion

This project prioritizes clarity, scalability, and responsiveness. Key features are implemented cleanly, and the structure allows for rapid iteration. Thank you for reviewing!

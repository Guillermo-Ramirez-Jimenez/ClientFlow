# ClientFlow

ClientFlow is a lightweight client management application built with React and TypeScript.  
It allows users to create, edit, delete, filter, and sort clients through a clean and responsive interface.

The project focuses on clean architecture, state management, and frontend best practices.

---

## 🚀 Live Demo

[Live Application](https://your-vercel-url.vercel.app)

---

## 📌 Features

- Create, edit and delete clients (CRUD)
- Search with debounce
- Filter by status
- Sort by different fields (ascending/descending)
- Loading overlay with animation
- Responsive layout
- Clean component structure
- Basic UI transitions for improved UX

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **TailwindCSS**
- Custom Hooks
- Vite
- Deployed on Vercel

---

## 🧠 Architecture & Decisions

- Business logic is separated from UI components using custom hooks.
- Filtering and sorting are memoized to avoid unnecessary recalculations.
- Loading and error states are handled explicitly to improve user feedback.
- Components are modular and reusable.
- The structure allows replacing the mock backend with a real REST API easily.

---

## 📂 Project Structure
src/
├── components/
├── hooks/
├── types/
├── pages/
└── services/

---


- `hooks/` contains logic abstraction (e.g. useClients, useDebounce).
- `components/` contains reusable UI components.
- `types/` centralizes TypeScript definitions.
- `pages/` contains main views.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/clientflow.git
cd clientflow
npm install

Run in development:

npm run dev

Build for production:

npm run build

---

## 🔮 Possible Improvements

Replace mock API with a real backend (REST + database)

Add authentication and user roles

Implement server-side filtering & pagination

Add unit and integration tests

Improve accessibility (ARIA roles, keyboard navigation)

---

## 📄 License

This project is open for learning and portfolio purposes.
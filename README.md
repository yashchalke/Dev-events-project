# Dev Events Project

A full-stack platform for browsing, creating, and managing developer-focused events.
This project includes:

* **Organizer Dashboard** – Create/manage events & verify attendance using an integrated **QR scanner**.
* **Developer Dashboard** – Browse events, register, and access digital tickets.

---

## 📑 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Configuration](#configuration)
* [Usage](#usage)
* [Screenshots (Optional)](#screenshots-optional)
* [License](#license)

---

## 📘 Overview

**Dev Events** is a role-based event management system specifically designed for developer-oriented meetups, hackathons, and community events.

* **Organizers** can:

  * Create new events
  * Manage attendees
  * Verify registrations using an in-app **QR code scanner**

* **Developers** can:

  * Browse events
  * Register instantly
  * Access a digital event ticket (QR code)

The repository contains both the **Backend API** and **Frontend client**.

---

## ⭐ Features

### 👨‍💼 Organizer Features

* Create and manage events
* View attendee lists
* Verify attendance using QR code scanning
* Manage event visibility

### 👨‍💻 Developer Features

* Explore upcoming and ongoing events
* Register for events
* Access a digital ticket (QR code)
* View personal registered events

### 🛠 Common Features

* Secure authentication
* Responsive UI (Tailwind CSS)
* REST API integration
* Fully typed frontend & backend (TypeScript)

---

## 🧰 Tech Stack

### **Frontend**

* React (TypeScript)
* Tailwind CSS
* Vite (assumption — update if needed)
* QR Scanner library (e.g., `react-qr-reader` or similar)

### **Backend**

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* JSON Web Tokens (JWT) authentication

---

## 📁 Project Structure

```
/
├── Backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── Frontend-DevEvents/
    ├── src/
    ├── package.json
    └── ...
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/yashchalke/Dev-events-project.git
cd Dev-events-project
```

---

## ⚙ Backend Setup

```bash
cd Backend
npm install
```

### Run in Development

```bash
npm run dev
```

### Build (TypeScript → JS)

```bash
npm run build
```

### Start Production

```bash
npm start
```

---

## 💻 Frontend Setup

```bash
cd Frontend-DevEvents
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔧 Configuration

### Backend `.env` example

> Update based on actual variable names in your code.

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/dev-events
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env` example

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ▶️ Usage

1. Start the **backend API**
2. Start the **frontend dev server**
3. Create an account (organizer or developer)
4. Explore events or create new ones
5. Register for events
6. Scan QR codes for attendance (organizer)

---

## 🖼 Screenshots (Optional)

If you share screenshots, I can embed them here:

```
/assets/screenshots/
├── login.png
├── organizer-dashboard.png
├── events.png
└── qr-scanner.png
```

---

## 📄 License

This is a personal project and has **no assigned license** by default.
If you'd like to add one, I can generate a proper `LICENSE` file (MIT, Apache-2.0, GPL, etc.).

---

If you want, I can:

✅ Scan the repository and generate
**exact scripts, exact environment variable names, extracted routes, API docs, and more**.

Just say **"scan repo and refine README"**.

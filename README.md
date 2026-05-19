# 🧪 CMSC 129 Laboratory 4 — Reminders App (TDD)

## 📱 App Description

The Reminders App is a simple single-resource CRUD web application inspired by the iOS Reminders application. It allows users to create, view, and manage personal reminders in a clean and minimal interface.

This project is built using Test-Driven Development (TDD), where tests are written before implementation to ensure correctness, maintainability, and disciplined software development using the Red-Green-Refactor cycle.

---

## 👤 User Stories

1. As a user, I want to add a reminder so that I can remember important tasks.

2. As a user, I want to view all my reminders so that I can see what I need to do.

3. As a user, I want to delete or mark reminders as completed so that I can manage finished or unnecessary tasks.

---

## 🧰 Tech Stack

- Frontend: React + TypeScript (Vite)
- Styling: TailwindCSS
- Unit & Integration Testing: Jest + React Testing Library
- System Testing: Playwright
- Data Storage: localStorage or in-memory state (JavaScript array)

No backend or database is required for this project.

---

## 🧪 Testing Strategy

This project strictly follows the Test-Driven Development (TDD) Red-Green-Refactor cycle and is divided into three testing levels:

### 🔹 1. Unit Tests
Unit tests focus on isolated business logic and pure functions. These tests do not involve React components or the browser.

Examples:
- Adding a reminder to a list
- Deleting a reminder by ID
- Toggling completion status
- Validating reminder input (e.g., empty title not allowed)

---

### 🔹 2. Integration Tests
Integration tests verify the interaction between React components and business logic. These tests ensure that user actions correctly update the UI state.

Examples:
- Rendering a list of reminders
- Adding a reminder through a form and verifying UI update
- Deleting a reminder and confirming it disappears from the UI

---

### 🔹 3. System Tests
System tests simulate real user behavior in a browser environment. These tests validate the full application flow.

Examples:
- User opens the app and adds a reminder
- User sees the reminder displayed on the screen
- User deletes or completes a reminder and sees UI updates

---

## 🚀 Setup Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run unit + integration tests
npm test

# Run system tests (Playwright)
npx playwright test
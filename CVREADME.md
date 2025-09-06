This document provides a comprehensive overview of the `quiz-app-frontend` codebase, a React application designed to interact with an AI-powered quiz generation backend.

## Project Overview

**QuizGen** (as branded in the `Navbar`) is a sophisticated **AI-powered quiz generation platform**. The application allows authenticated users to upload documents (PDFs, DOCX, or TXT files), which are then processed by a backend service (a FastAPI application hosted on Heroku) to generate multiple-choice quizzes based on the document's content.

Users can then take these quizzes, receive immediate results with detailed explanations, review their complete quiz history, and manage their uploaded files and associated quizzes from a central dashboard.

### Core Features

* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens). Almost all app functionality is protected and requires a valid token.
* **Session Management:** The app actively monitors the user's session token and provides a 10-second warning toast before automatically logging the user out upon expiration.
* **Document Upload:** Users can upload `.pdf`, `.docx`, and `.txt` files. The app performs client-side validation on file extensions.
* **AI Quiz Generation:** On file upload, the app sends the file to the backend, which processes it and returns an initial set of quiz questions. Users can also request *more* questions to be generated for an existing file from their dashboard.
* **Quiz Interface:** A clean, card-based UI for taking quizzes, tracking selected answers in the component state.
* **Results & Review:** After submission, users are directed to a results page showing their score (with a dynamic pass/warn/fail badge), their submitted answer, the correct answer, and an explanation for every question.
* **Quiz Dashboard:** A central hub (`/`) where users can see all their uploaded files. Selecting a file loads all associated "quiz sections" (batches of questions), allowing the user to retake any quiz.
* **Attempt History:** A dedicated page (`/history`) that lists all past quiz attempts with scores and timestamps. Users can also view a modal showing every single attempt for a specific quiz.
* **UI/UX:** The app is built with **React Bootstrap**, is fully responsive, and features a **dark/light mode** toggle. It provides loading overlays for all asynchronous actions and uses toasts and **confetti** animations for positive user feedback.

### Technology Stack

* **UI Library:** **React 18** (via Create React App)
* **Routing:** **React Router DOM v6** for client-side routing.
* **HTTP Client:** **Axios**, with a centralized base instance for API calls.
* **UI Framework:** **React Bootstrap** & Bootstrap 5 (CSS).
* **Authentication:** **JWT** handling using `jwt-decode` and manual payload parsing in `authUtils.js`.
* **UX/Effects:** **`canvas-confetti`** for celebratory animations.
* **Testing:** **Jest** & **React Testing Library (RTL)**, with manual mocks for Axios.
* **Deployment:** The project includes a `Procfile` and a minimal `server.js`, indicating it's configured for deployment on a PaaS like **Heroku**, using an Express server to serve the static React build.

---

## Codebase Analysis

This section details the purpose and function of each file and directory in the project.

### Root Files

* **`package.json` / `package-lock.json`**: Standard NPM files managing project dependencies (React, Axios, Bootstrap, etc.) and scripts.
* **`Procfile`**: A Heroku-specific file that declares what command to run to start the application (likely `node server.js`).
* **`server.js`**: (Content not provided) This is almost certainly a minimal Express.js server used to serve the static `build` folder produced by Create React App. This is a standard pattern for deploying SPAs (Single Page Applications) on platforms like Heroku.
* **`README.md`**: Project documentation (content not provided).

### `public/` Directory

This directory holds the static assets and the root HTML shell, which is standard for a Create React App setup.
* **`index.html`**: The main HTML file. Your React application is injected into the `<div id="root"></div>` element within this file.
* **`favicon.ico`, `logo192.png`, `logo512.png`**: Application icons used for browser tabs and mobile home screens.
* **`manifest.json`**: A JSON file that describes the application for PWA (Progressive Web App) features.
* **`robots.txt`**: A file to instruct web crawlers on which pages to index or ignore.

---

### `src/` - Core Application Logic

This is the main application folder containing all React components, logic, and styles.

#### Entrypoint & Configuration

* **`index.js`**: The primary entry point of the React app. It imports the global `index.css` and the Bootstrap CSS (`bootstrap.min.css`), then renders the root `<App />` component into the DOM, wrapped in `<React.StrictMode>`.
* **`App.js`**: **The heart of the application**. This component:
    1.  Sets up all application routing using `react-router-dom` (`<Router>`, `<Routes>`, `<Route>`).
    2.  Manages the global **dark mode state** (`[darkMode, setDarkMode]`) and passes it as a prop to all child components.
    3.  Defines an **inline `PrivateRoute` function** that checks token validity (`isTokenValid`) before rendering a protected component or redirecting to `/login`. This function is wrapped around all authenticated routes (Dashboard, Quiz, Results, etc.).
    4.  Manages redirect logic (e.g., preventing logged-in users from accessing `/login` or `/signup`).
    5.  Renders the main layout: the persistent `<AppNavbar />` and `<SessionWatcher />` components, along with the active page component defined by the router.
* **`index.css` / `App.css`**: Global and app-level stylesheets. `App.css` notably defines the `.global-overlay` style, which is used across components to display a full-screen loading spinner during API calls.
* **`reportWebVitals.js`**: A Create React App utility for measuring web performance metrics.

#### API & Utilities

* **`api/api.js`**: Defines and exports a **centralized Axios instance**. It sets the `baseURL` to the FastAPI backend, so components can make requests using relative paths (e.g., `/auth/login`) without repeating the full URL.
* **`utils/authUtils.js`**: A set of helper functions for authentication:
    * `getToken()`: Retrieves the JWT from `localStorage`.
    * `decodeToken()`: Manually parses the JWT payload by splitting the string and using `atob()` (Base64 decoding), avoiding a full library just for decoding.
    * `isTokenExpired()`: Decodes the token, checks its `exp` (expiration) timestamp against the current time, and returns `true` or `false`.
    * `logout()`: Removes the token from `localStorage`.
    * *(Note: The `PrivateRoute` defined in `components/PrivateRoute.js` uses these utils, but the router in `App.js` uses its own internal `isTokenValid` function that leverages the `jwt-decode` library directly. This indicates a slight redundancy in the codebase.)*

#### Testing

* **`setupTests.js`**: Configures the Jest testing environment by importing `@testing-library/jest-dom`, which adds helpful DOM-specific matchers (e.g., `.toBeInTheDocument()`).
* **`__mocks__/axios.js`**: A manual Jest mock for Axios. This file is automatically used instead of the real Axios during tests, replacing methods like `.get()` and `.post()` with mock functions (`jest.fn()`) to prevent real network requests.
* **`App.test.js`**: A simple "smoke test" to ensure the `<App />` component renders without crashing.

---

### `src/components/` - UI Components & Features

This directory holds all the reusable React components that make up the application's views and functionality.

#### Authentication & Session

* **`Login.js`**: Renders the login form. On submit, it formats the data as `application/x-www-form-urlencoded` (required by the backend's OAuth2 endpoint), POSTs to `/auth/login`, and on success, saves the `access_token` to `localStorage` and navigates the user to the dashboard (`/`).
* **`Register.js`**: Renders the signup form. On submit, it POSTs the new user data (as JSON) to `/auth/signup` and navigates to the login page on success, handling any backend validation errors.
* **`PrivateRoute.js`**: A component-based wrapper for protected routes. It uses the `authUtils.js` helpers to check for a valid token. If valid, it renders the `children`; otherwise, it navigates to `/login`. *(Note: This file exists but is NOT the one used by `App.js`, which defines its own auth logic inline).*
* **`SessionWatcher.js`**: A utility component (rendered globally in `App.js`) that handles session expiration. On mount, it decodes the JWT and sets two timeouts:
    1.  A `toastTimer` to show a "Session Expiring" warning toast 10 seconds before expiry.
    2.  A `logoutTimer` to automatically run the logout function (clear token, redirect to `/login`) precisely when the token expires.

#### Core Application Views

* **`Dashboard.js`**: The main landing page (`/`) for logged-in users.
    * On load, it fetches all user files from `/user/dashboard/files` and displays them as cards.
    * Clicking a file card calls `/user/dashboard/files/<fileId>/sections` to get all associated quiz sections (batches of questions) and displays them in a table.
    * From the table, the user can click "Take Quiz," which triggers a confetti effect and navigates to `/quiz`, passing that section's quiz data in the route state.
    * It also features a "Generate More Quizzes" button, which POSTs to `/user/dashboard/files/<fileId>/generate`, triggers confetti and a success toast, and then refreshes the sections list.
* **`FileUpload.js`**: The view for the `/upload` route.
    * It provides a file input form with client-side validation for `.pdf`, `.docx`, and `.txt` files.
    * On submit, it shows a global loading overlay, sends the file as `multipart/form-data` to the `/upload-db/` backend endpoint (which generates the quiz).
    * On success, it triggers confetti, shows a "Quiz Ready!" success toast, and after a 2-second delay, navigates the user to `/quiz` with the newly generated quiz data.
* **`QuizPage.js`**: The view for the `/quiz` route.
    * It reads the quiz data (questions, options, etc.) passed from `FileUpload` or `Dashboard` via `useLocation().state`.
    * If no quiz data is found (e.g., user navigates directly to `/quiz`), it displays a helpful message with links to the Dashboard and Upload pages.
    * It renders each question as a card with radio button options, storing the user's selected answers in its local state.
    * On submit, it shows a loading overlay and POSTs the quiz data and the user's answers to the `/answers/` endpoint. The backend evaluates the answers and sends back the results.
    * It then navigates the user to `/results`, passing the backend's evaluation data in the route state.
* **`ResultsPage.js`**: The view for the `/results` route.
    * It reads the evaluation data (from `QuizPage`) via route state. If no data exists, it shows a "No results" message.
    * It calculates the final score (e.g., "8 / 10") and displays it with a large, color-coded badge (green for high scores, yellow for medium, red for low).
    * It maps over each result object, displaying the question, the user's answer (badged as correct/incorrect), the correct answer, and the backend-provided explanation.
    * It provides several navigation buttons: "Take this Quiz Again," "Go back to dashboard," "Go back to history," and "Try Another File."
* **`HistoryPage.js`**: The view for the `/history` route.
    * On load, it fetches all past quiz attempts from `/user/dashboard/history` and displays them in a summary table.
    * Each row has a "View All Attempts" button which, when clicked, fetches all attempts for that *specific quiz ID* from `/user/dashboard/quiz/<quizId>/attempts` and displays them in a React Bootstrap modal.

#### Shared Components

* **`Navbar.js`**: The main application navigation bar, rendered globally by `App.js`. It uses React Bootstrap components (`<Navbar>`, `<Nav>`) and React Router's `<Link>` to navigate. It includes the "QuizGen" brand link, links to all main pages, the dark mode switch, and conditionally renders "Login/Sign Up" buttons or a "Logout" button based on token presence.
* **`Loader.js`**: A simple, standalone "Generating quiz..." spinner component. *(Note: This component does not appear to be used by any of the other main components, which implement their own loading logic via the global `.global-overlay` CSS class instead. This file may be legacy or unused.)*

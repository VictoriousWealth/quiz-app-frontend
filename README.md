# 🧠 Frontend – AI-Powered Quiz Web App

This is the **React.js frontend** for the AI-powered quiz generation app. Users can sign up, upload documents, generate quizzes using AI, and review quiz results – all in a clean, responsive, and dark/light mode interface.

---

## 🚀 Tech Stack

- **React.js** (with React Router)
- **Bootstrap 5**
- **Fetch API** for backend integration
- **JWT Authentication** (stored in `localStorage`)
- **Confetti + Toasts** for fun user experience
- **Dark Mode Toggle** throughout

---

## 📁 Project Structure

`frontend/`
├── `public/` 
│ └── `index.html` 
├── `src/` 
│ ├── `api/` # Axios API setup 
│ ├── `components/` # UI Pages and Components 
│ ├── `App.js` # Main Router 
│ ├── `App.css` # Styling 
│ └── `index.js` # Entry Point

---

## ⚙️ Setup Instructions

1. **Install dependencies:**

```bash
cd frontend
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Make sure backend is running at http://localhost:8000**

---

## 🔑 Auth Flow

- On successful login, a JWT token is saved in localStorage as "token".
- Protected API requests automatically include this token in headers:

```bash
headers: {
  Authorization: `Bearer ${token}`
}
```

---

## 🖼️ Available Pages

| Page        | Path      | Auth Required   | Description
|-------------|-----------|-----------------|----------------------------------------|
| Login       | /login	  | ❌ No           | User login                             |           
| Register	  | /register | ❌ No           | New account signup                     |
| Dashboard	  | /      	  | ✅ Yes          | List of uploaded files + quizzes       |
| File Upload |	/upload	  | ✅ Yes          | Upload DOCX, PDF, or TXT files         |
| Quiz Page	  | /quiz	  | ✅ Yes          | Take quiz generated by AI              |
| Results	  | /results  | ✅ Yes          | View correct answers and explanations  |
| History	  | /history  | ✅ Yes          | View past quiz attempts                |

---

## 🌙 Dark Mode Support

- Toggle applied globally to all pages and components
- Affects card themes, button variants, backgrounds, text, overlays, etc.

---

## 📸 Demo & Screenshots
44 detailed screenshots have been uploaded to showcase user flow, dark/light mode, quiz results, and dashboard views.
Here are some visual highlights of the app in both light and dark modes:

### 🔐 Login
<table>
  <tr>
    <td><img src="docs/screenshots/login_light_empty.png" alt="Login Light with no details" width="250"/></td>
    <td><img src="docs/screenshots/login_light_filled.png" alt="Login Light with details filled in" width="250"/></td>
    <td><img src="docs/screenshots/login_dark_empty.png" alt="Login Dark with no details" width="250"/></td>
    <td><img src="docs/screenshots/login_dark_filled.png" alt="Login Dark with details filled in" width="250"/></td>
  </tr>
</table>

---

### 📂 Upload File & Generate Quiz
<table>
  <tr>
    <td><img src="docs/screenshots/upload_light_empty.png" alt="Upload Light with no file chosen" width="250"/></td>
    <td><img src="docs/screenshots/upload_light_filled.png" alt="Upload Light with file chosen" width="250"/></td>
    <td><img src="docs/screenshots/upload_dark_empty.png" alt="Upload Dark with no file chosen" width="250"/></td>
    <td><img src="docs/screenshots/upload_dark_filled.png" alt="Upload Dark with file chosen" width="250"/></td>
    <td><img src="docs/screenshots/upload_dark_loading.png" alt="Upload Dark now uploading file" width="250"/></td>
    <td><img src="docs/screenshots/upload_dark_success.png" alt="Upload Dark now generating quiz" width="250"/></td>
  </tr>
</table>

---

### 🧠 Quiz Page
<table>
  <tr>
    <td><img src="docs/screenshots/quiz_light_empty.png" alt="Quiz Light with no quiz data" width="250"/></td>
    <td><img src="docs/screenshots/quiz_light_filled_top.png" alt="Quiz Light with quiz data Top section" width="250"/></td>
    <td><img src="docs/screenshots/quiz_light_filled_bottom.png" alt="Quiz Light with quiz data Bottom section" width="250"/></td>
    <td><img src="docs/screenshots/quiz_dark_empty.png" alt="Quiz Dark with no quiz data" width="250"/></td>
    <td><img src="docs/screenshots/quiz_dark_filled_top.png" alt="Quiz Dark with quiz data Top section" width="250"/></td>
    <td><img src="docs/screenshots/quiz_dark_filled_bottom.png" alt="Quiz Dark with quiz data Bottom section" width="250"/></td>
    <td><img src="docs/screenshots/quiz_dark_filled_loading.png" alt="Quiz Dark with quiz data loading section" width="250"/></td>
  </tr>
</table>

---

### 📊 Results Page
<table>
  <tr>
    <td><img src="docs/screenshots/results_light_empty.png" alt="Results Light with no results data" width="250"/></td>
    <td><img src="docs/screenshots/results_light_filled_top.png" alt="Results Light with results data Top Section" width="250"/></td>
    <td><img src="docs/screenshots/results_light_filled_bottom.png" alt="Results Light with no results data Bottom Section" width="250"/></td>
    <td><img src="docs/screenshots/results_dark_empty.png" alt="Results Dark with no results data" width="250"/></td>
    <td><img src="docs/screenshots/results_dark_filled_top.png" alt="Results Dark with no results data Top Section" width="250"/></td>
    <td><img src="docs/screenshots/results_dark_filled_bottom.png" alt="Results Dark with no results data Bottom Section" width="250"/></td>
  </tr>
</table>

---

### 🗂️ Dashboard & History
<table>
  <tr>
    <td><img src="docs/screenshots/dashboard_light_empty.png" alt="Dashboard Light with no files data" width="250"/></td>
    <td><img src="docs/screenshots/dashboard_light_filled.png" alt="Dashboard Light with files data" width="250"/></td>
    <td><img src="docs/screenshots/dashboard_light_filled_show_section.png" alt="Dashboard Light with files data showing one or more section" width="250"/></td>
    <td><img src="docs/screenshots/dashboard_dark_empty.png" alt="Dashboard Dark with no files data" width="250"/></td>
    <td><img src="docs/screenshots/dashboard_dark_filled.png" alt="Dashboard Dark with files data" width="250"/></td>
    <td><img src="docs/screenshots/dashboard_dark_filled_show_section.png" alt="Dashboard Dark with files data showing one or more section" width="250"/></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/history_light_filled.png" alt="History Light" width="250"/></td>
    <td><img src="docs/screenshots/history_light_filled_view_attempts.png" alt="History Light show view attempts" width="250"/></td>
    <td><img src="docs/screenshots/history_dark_filled.png" alt="History Dark" width="250"/></td>
    <td><img src="docs/screenshots/history_dark_filled_view_attempts.png" alt="History Dark show view attempts" width="250"/></td>
  </tr>
</table>

---

## 🧪 Testing

No frontend tests have been written yet.
You can add tests using React Testing Library or Cypress.

---

## 📌 Notes

- Uses React Bootstrap for rapid prototyping.
- Works seamlessly with FastAPI backend at localhost:8000.
- Accessible, responsive, and optimized for both desktop and mobile.

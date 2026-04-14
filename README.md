# Student AI Platform

A full-functional learning platform where students can search subjects to get AI-generated notes, curated video links, and upload documents for AI summarization.

## Tech Stack
- **Frontend**: React (Vite), React Router, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express.js, Multer, PDF-Parse, Google Gemini AI API

---

## 🚀 How to Run Locally in VS Code

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Get a Google Gemini API Key from Google AI Studio.

### Step 1: Open the Project
1. Open up **Visual Studio Code**.
2. Click **File > Open Folder** and select the `student-ai-platform` folder.

### Step 2: Set up the Backend
1. Open a new terminal in VS Code (`Ctrl + \`` or `Terminal > New Terminal`).
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `backend` folder and add your Gemini API Key:
   ```env
      GEMINI_API_KEY=your_gemini_api_key_here
      PORT=5000
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```
   *(The server should run on `http://localhost:5000`)*

### Step 3: Set up the Frontend
1. Open a second terminal window in VS Code (click the `+` icon in the terminal panel).
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the Vite React development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to the link Vite provides (usually `http://localhost:5173`). Have fun exploring!

---

## 🌍 How to Fully Deploy on Vercel

Vercel can host both the React Frontend and the Node.js Express Backend. 

### Step 1: Initialize Git and Push to GitHub
1. In your root `student-ai-platform` folder, initialize Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on [GitHub](https://github.com/) and push your code.

### Step 2: Deploy Frontend on Vercel
1. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New > Project**.
3. Import your `student-ai-platform` repository.
4. **Important Configuration**:
   - In the **Root Directory** setting, click "Edit" and select `frontend`.
   - Framework Preset should be autodetected as `Vite`.
   - Click **Deploy**.
5. Your frontend is now live! But it's disconnected from the backend. Note down the frontend URL (e.g., `https://student-ai-frontend.vercel.app`).

### Step 3: Deploy Backend on Vercel
*Note: Vercel serverless functions support Express endpoints natively because we've provided a `vercel.json`.*

1. In the Vercel Dashboard, click **Add New > Project**.
2. Import the exact same `student-ai-platform` repository from GitHub.
3. This time, in the **Root Directory** setting, select `backend`.
4. Go to **Environment Variables** and add:
   - `GEMINI_API_KEY`: [Your Gemini API Key]
5. Click **Deploy**. Vercel will host your Express API.
6. Note down the backend URL (e.g., `https://student-api-backend.vercel.app`).

### Step 4: Connect the Live App
Now that both are deployed, you need to point the frontend to the new backend URL instead of `localhost:5000`.

1. In `frontend/src/pages/TopicSearch.jsx` and `DocSummarizer.jsx`:
   Find the fetch URL: `http://localhost:5000/api/...`
   Replace it with your deployed backend URL: `https://student-api-backend.vercel.app/api/...`
2. Configure CORS in your `backend/server.js`:
   ```javascript
   app.use(cors({
       origin: "https://student-ai-frontend.vercel.app" // Your live frontend URL
   }));
   ```
3. Commit the changes and push to GitHub. Vercel will automatically trigger a new build and deploy both connected applications!

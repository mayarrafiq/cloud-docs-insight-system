# CloudDocs Insight System

## [Demo](https://cloud-docs-system.vercel.app/)

## Project Description

CloudDocs Insight System is a cloud-based application designed to store, search, sort, and classify a large set of PDF and Word documents. It leverages Supabase for cloud storage and Node.js with Express for the backend. Users can upload documents, perform keyword searches, and sort or classify content based on predefined logic.

### Key Features

* **Cloud Storage**: Secure document storage powered by Supabase.
* **Document Management**: Upload, organize, and manage PDF and Word documents.
* **Smart Search**: Full-text search with keyword highlighting.
* **Classification**: Simulated document classification with confidence scores.

## How It Works

1. **Frontend**: Built with React and TailwindCSS, the frontend provides an intuitive interface for users to interact with the system.
2. **Backend**: The backend API, hosted separately, handles document uploads, scraping, searching, and classification. It uses Supabase for storage and database operations.
3. **Integration**: The frontend communicates with the backend via REST API endpoints.

## Project Details

* **Frontend Framework**: React with Vite.
* **Styling**: TailwindCSS.
* **Backend**: Node.js with Express ([Cloud Document API](https://github.com/mayarrafiq/cloud-document-api))
* **Database**: Supabase.

---

## 🔧 Building the Project

### Prerequisites

* Node.js v18+
* npm or yarn
* Supabase account with:

  * `cloud` storage bucket
  * `documents` table (see backend README for schema)

---

### 🖥 Frontend Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/mayarrafiq/cloud-docs-insight-system.git
   cd cloud-docs-insight-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file:

   ```env
   VITE_BACKEND_URL=http://localhost:5000/api
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:8080`.

---

### 🗂 Backend Setup

For full setup instructions, please refer to the backend repository:

👉 [cloud-document-api](https://github.com/mayarrafiq/cloud-document-api)

Basic steps:

1. Clone the backend repository:

   ```bash
   git clone https://github.com/mayarrafiq/cloud-document-api.git
   cd cloud-document-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Rename `.env.example` to `.env` and follow the instructions in the backend README to configure:

   ```env
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

4. Start the backend server:

   ```bash
   node index.js
   ```

The backend will run at `http://localhost:5000`.

---

## 🔐 Setting Up Supabase Credentials

To connect your application with Supabase, you need the following environment variables:

### `.env` (used in both frontend and backend)

```env
SUPABASE_URL=https://<your-project-id>.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-anon-public-key     # frontend only
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # backend only
```

### 📥 How to Get These Values

1. Log in to Supabase: [https://app.supabase.com](https://app.supabase.com)
2. Open your project.
3. Go to **Settings** → **API**.
4. Copy:

   * **Project URL** → `SUPABASE_URL`
   * **Anon public key** → `SUPABASE_PUBLISHABLE_KEY`
   * **Service role key** (for backend only) → `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ **Important**: Never expose your Service Role Key in frontend code. Use it only on the server side.

---

## Notes

* Ensure the backend is running before using the frontend.
* Supported file types: `.pdf`, `.docx`.
* Classification is randomized and not AI-based (for the assignment only).

---

## Authors

* Mayar El Falougi - 220211605
* Nada Ahmed El Taweel - 220210204

## Supervisor

* Dr. Rebhi S. Baraka

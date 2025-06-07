# CloudDocs Insight System

## Project Description
CloudDocs Insight System is a cloud-based application designed to store, search, sort, and classify a large set of PDF and Word documents. It leverages Supabase for cloud storage and Node.js with Express for the backend. Users can upload documents, perform keyword searches, and sort or classify content based on predefined logic.

### Key Features
- **Cloud Storage**: Secure document storage powered by Supabase.
- **Document Management**: Upload, organize, and manage PDF and Word documents.
- **Smart Search**: Full-text search with keyword highlighting.
- **Classification**: Simulated document classification with confidence scores.

## How It Works
1. **Frontend**: Built with React and TailwindCSS, the frontend provides an intuitive interface for users to interact with the system.
2. **Backend**: The backend API, hosted separately, handles document uploads, scraping, searching, and classification. It uses Supabase for storage and database operations.
3. **Integration**: The frontend communicates with the backend via REST API endpoints.

## Project Details
- **Frontend Repository**: This repository contains the frontend code.
- **Backend Repository**: The backend code is available at [Cloud Document API](https://github.com/mayarrafiq/cloud-document-api).

## Building the Project

### Prerequisites
- Node.js v18+
- npm or yarn
- Supabase account with:
  - `cloud` storage bucket
  - `documents` table (see backend README for schema)

### Steps to Build

#### Frontend
1. Clone this repository:
   ```bash
   git clone https://github.com/your-org/cloud-docs-insight-system.git
   cd cloud-docs-insight-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:8080`.

#### Backend
1. Clone the backend repository:
   ```bash
   git clone https://github.com/mayarrafiq/cloud-document-api.git
   cd cloud-document-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Rename `.env.example` to `.env` and add your Supabase project URL and service role key.
4. Start the backend server:
   ```bash
   node index.js
   ```
5. The backend will run at `http://localhost:5000`.

## Notes
- Ensure the backend is running before using the frontend.
- Supported file types: `.pdf`, `.docx`.
- Classification is randomized and not AI-based (for the assignment only).

## Authors
- Mayar El Falougi - 220211605
- Nada Ahmed El Taweel - 220210204

## Supervisor
- Dr. Rebhi S. Baraka
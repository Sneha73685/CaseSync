# CaseSync

CaseSync is an AI-powered transcription and documentation platform designed to streamline case handling for law enforcement and legal teams. It converts audio and video into structured documents, organizes case files, and enables efficient editing, reviewing, and multilingual processing.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CaseSync modernizes case documentation by integrating real-time multilingual transcription using the Bhashini API, automatic FIR structuring, offline recording, and video transcription. It provides a seamless workflow across mobile and web platforms, reducing manual effort and increasing efficiency in law enforcement case management.

---

## Key Features

- Real-time multilingual transcription  
- Automatic FIR generation  
- Offline audio recording support  
- Video transcription and evidence extraction  
- Web dashboard for case editing and management  
- Mobile app for field officers  
- Secure authentication using OAuth2 and JWT  
- PostgreSQL-based structured storage  
- File management and document organization  
- Synchronization between web and mobile clients  

---

## Architecture

CaseSync is built using a modular multi-tier architecture:

- **Frontend (Web):** React.js dashboard  
- **Frontend (Mobile):** React Native application  
- **Backend:** FastAPI server with REST APIs  
- **Database:** PostgreSQL for all records and logs  
- **External Services:** Bhashini API for speech processing  
- **Deployment:** Dockerized setup with optional Nginx reverse proxy  

---

## Tech Stack

### Web Frontend
- React.js  
- Tailwind CSS  
- Axios  
- React Router  

### Mobile Frontend
- React Native  
- Expo or Native CLI  
- Async Storage  

### Backend
- FastAPI  
- Python  
- SQLAlchemy  
- JWT Authentication  
- Uvicorn  

### Database
- PostgreSQL  

### Additional Tools
- Docker  
- Bhashini API  
- GitHub Actions (optional)  

---

## Installation

### Clone Repository
```bash
git clone https://github.com/Sneha73685/CaseSync.git
cd CaseSync
Install Dependencies
Web
bash
Copy code
cd web
npm install
Mobile
bash
Copy code
cd mobile
npm install
Backend
bash
Copy code
cd backend
pip install -r requirements.txt
Environment Variables
Create .env files for both backend and frontend.

Backend .env
ini
Copy code
DATABASE_URL=postgresql://username:password@localhost:5432/casesync
JWT_SECRET=your_secret_key
BHASHINI_API_KEY=your_api_key
BHASHINI_ENDPOINT=your_api_endpoint
Frontend .env
ini
Copy code
VITE_API_URL=http://your-backend-url
Running the Project
Backend
bash
Copy code
cd backend
uvicorn main:app --reload
Web Application
bash
Copy code
cd web
npm run dev
Mobile Application
bash
Copy code
cd mobile
npm start
Docker Setup (Optional)
bash
Copy code
docker-compose up --build
Project Structure
bash
Copy code
CaseSync/
│
├── web/                   # React.js web dashboard
├── mobile/                # React Native mobile application
├── backend/               # FastAPI backend
│   ├── main.py
│   ├── routers/
│   ├── models/
│   ├── services/
│   └── database.py
│
├── docs/                  # Documentation files
├── .gitignore
├── README.md
└── docker-compose.yml

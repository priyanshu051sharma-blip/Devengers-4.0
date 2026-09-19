# UrbanSaathi Project Details

## 1. Project Overview

UrbanSaathi is a smart urban traffic and mobility platform designed to monitor road conditions, enforce traffic insights, support emergency responses, and improve citizen services through computer-vision-based analysis.

It combines:
- a React-based frontend for dashboards and user portals,
- an Express.js backend for APIs and business workflows,
- a Python ML service for object detection and traffic analysis,
- and optional UrbanFlow services for mobility and simulation features.

The platform is meant to support:
- traffic monitoring,
- violation detection,
- parking operations,
- emergency response coordination,
- citizen reporting,
- and AI-assisted roadside analysis.

---

## 2. Problem Statement

Traffic authorities and city operators usually work with multiple fragmented systems for:
- traffic monitoring,
- fine and violation management,
- parking controls,
- incident reporting,
- emergency response,
- and operational dashboards.

This creates gaps in visibility, slows coordination, and reduces efficiency in responding to congestion, violations, and emergencies.

UrbanSaathi addresses this by unifying these processes into a single platform.

---

## 3. Core Solution

UrbanSaathi brings together multiple layers:

1. Frontend Web Applications
   - Admin portal
   - Citizen portal
   - Mobile and field modules
   - Connected-driver dashboard

2. Express API Layer
   - User actions and service integrations
   - Real-time events using Socket.IO
   - Role-based operations and workflows

3. Python Vision API
   - YOLO-based traffic analysis
   - Number plate OCR
   - Object detection
   - Traffic frame processing and violation logic

4. Optional UrbanFlow Service
   - Simulation and mobility-related endpoints
   - ML and tabular model integration

---

## 4. Key Features

### 4.1 Traffic and Monitoring Features
- Traffic analysis dashboard
- Camera and road monitoring workflows
- Congestion detection
- Traffic frame processing
- Uploaded image/video analysis

### 4.2 Vehicle and Violation Features
- Vehicle detection using YOLO models
- License-plate OCR
- Challan and violation processing
- Evidence snapshots for enforcement workflows

### 4.3 Emergency Response Features
- Emergency vehicle management
- Green corridor activation logic
- Route optimization and rerouting
- Real-time emergency alerts

### 4.4 Citizen and Operations Features
- Parking-related services
- Citizen reports
- Service workflows
- Public information access

### 4.5 Real-time and Integration Features
- Socket.IO notifications
- Dashboard updates
- Connected driver / dashcam interface
- UrbanFlow and V2X simulation endpoints

---

## 5. System Architecture

The project follows a layered architecture:

```text
React / Vite Frontend (port 5173)
        |
        v
Express API + Socket.IO Backend (port 5001 or standalone 5000)
        |                         |
        v                         v
MongoDB                  Python Vision API (port 8000)
                                  |
                                  v
                        YOLO + OCR + Image Analysis
```

### Architectural Notes
- The frontend interacts with the backend through APIs.
- The backend handles application logic, authentication, routes, and events.
- The Python ML service performs detection, OCR, and image-based analysis.
- Optional UrbanFlow runs on port 8001 and supports model-driven or simulated mobility features.

---

## 6. Technology Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Axios
- Socket.IO client

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- JWT-based authentication

### AI/ML
- Python
- FastAPI
- Ultralytics YOLO
- PyTorch
- OpenCV
- Pillow
- EasyOCR
- NumPy
- pandas
- joblib

### Supporting Services
- UrbanFlow FastAPI service
- Model artifacts for tabular and mobility-related tasks

---

## 7. Repository Structure

```text
UrbanSaathi/
├── backend/                  # Express API, routes, models, services
├── frontend/                 # React/Vite app and demo assets
├── models/                   # Model artifacts and weights
├── training/                 # Training and evaluation scripts
├── data/                     # Synthetic and processed datasets
├── scripts/                  # Utility and setup scripts
├── docs/                     # Detailed technical and feature docs
├── urbanflow_app/            # Optional UrbanFlow service
├── ml_backend_api.py         # Python vision API entrypoint
├── docker-compose.yml
├── Dockerfile.ml
├── README.md
├── setup_ai.py
├── setup.bat
├── setup.sh
└── ...
```

---

## 8. AI and ML Components

The Python service loads model artifacts such as YOLO checkpoints for Indian traffic object detection. The default model includes classes such as:
- Two-wheeler
- Autorickshaw
- Car
- Bus
- LCV
- Truck
- Bicycle
- Pedestrian

The ML layer includes:
- object detection,
- real-time classification support,
- OCR for license plates,
- traffic-frame understanding,
- congestion analysis,
- violation detection,
- and optional real-data model loading.

The project also references the ITD Indian Traffic Dataset, with attribution to the original dataset source and license requirements.

---

## 9. How the System Works

### User Flow
1. User accesses the frontend portal.
2. Frontend requests needed data from backend APIs.
3. Backend authenticates and serves required information.
4. ML service analyzes uploaded images or video-derived frames.
5. Results are returned to the dashboard and operator workflows.

### AI Workflow
```text
Camera / uploaded image / video frame
        |
        v
Python Vision API
        |
        v
YOLO object detection + OCR
        |
        v
Traffic insights + violation logic + evidence output
```

---

## 10. Core Modules

### Frontend Module
- Dashboard for operators
- Admin workflows
- Citizen service interfaces
- Mobile and dashcam interfaces

### Backend Module
- Business logic
- API routes
- Authentication and authorization
- Socket.IO event handling
- Data model operations

### ML Module
- Detection model execution
- Vision processing pipeline
- OCR for vehicle plates
- Output generation for traffic decisions

### UrbanFlow Module
- Mobility simulation or predictive support
- Model-backed endpoints
- V2X and traffic-related analytics

---

## 11. Setup and Run Instructions

### 11.1 Frontend
```bash
cd frontend
npm install
npm run dev
```

Open:
```text
http://localhost:5173
```

### 11.2 Standalone Local Backend
This mode is useful for UI demos and does not require MongoDB.

```bash
cd backend
npm install
npm run dev:standalone
```

Standalone backend URL:
```text
http://localhost:5000
```

### 11.3 Full Backend + ML Service
Start MongoDB first, then run:

```bash
cd backend
npm install
npm run dev
```

From the project root:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r ml_requirements.txt
python ml_backend_api.py
```

Typical ports:
- Backend: http://localhost:5001
- Vision service: http://localhost:8000

### 11.4 Docker
```bash
docker compose up --build
```

This runs the project using the configured container services.

---

## 12. Demo and Usage

1. Open the frontend and log in with configured credentials.
2. Navigate to the Admin Dashboard and ML Detection section.
3. Upload an image or MP4 video.
4. Run analysis to detect objects and generate annotated outputs.
5. Review ML-detected results and violation-related evidence.

### Health Check for Vision API
```bash
curl http://localhost:8000/health
```

This endpoint returns detector status, backend info, task type, model availability, and image configuration details.

---

## 13. Deployment Considerations

The repository includes deployment-oriented documents and docker setup, which suggests this platform is intended for:
- local development,
- demo deployment,
- AI service integration,
- and scalable city-operations deployment.

Important deployment points:
- backend and frontend should be configured with correct env values,
- MongoDB must be available for full backend mode,
- ML dependencies must be installed in the Python environment,
- and model assets must be available for detection and OCR tasks.

---

## 14. Documentation References

The project contains a rich documentation set, including:
- Start Guide
- Architecture Docs
- Setup Guides
- ML system guides
- Deployment docs
- Emergency vehicle documentation
- API testing documentation
- Presentation documentation

This indicates a production-focused project structure with both technical implementation and business/operations documentation.

---

## 15. Summary

UrbanSaathi is a comprehensive urban intelligence and traffic management platform that fuses:
- web-based operations,
- real-time backend services,
- AI-powered computer vision,
- emergency mobility handling,
- and citizen-focused traffic workflows.

It is designed to make traffic monitoring more efficient, actionable, and data-driven by bringing multiple city operations into one connected system.

---

## 16. Final Notes

This project is best understood as a smart city traffic and mobility management solution with an AI-first operational layer. It is suitable for:
- city dashboards,
- traffic analysis,
- emergency mobility support,
- parking/violations operations,
- and citizen engagement workflows.

The repository is structured to support both local development and deployment-scale usage, combining modern web technologies with machine learning inference services.


## Project info

**URL**: https://lovable.dev/projects/a5c9ded5-7b6b-4743-9536-5fab9cf9432c



# ConnectEd

**ConnectEd** is a full-stack web application designed to enhance daily academic interactions among students, faculty, researchers, alumni, and other college community members. It aims to create an inclusive ecosystem for mentorship, study collaboration, resource sharing, and event engagement.

---

## 📌 Project Overview

ConnectEd enables seamless connections in an academic setting by offering smart matchmaking, real-time messaging, study buddy discovery, and a resource-sharing hub. With intuitive UI/UX, personalized dashboards, and role-based access, the platform supports productive collaboration across roles and interests.

---

## 🎯 Target Users

- 🎓 Students  
- 🧑‍🏫 Professors and Faculty  
- 🔬 Research Assistants  
- 🎓 Alumni  

---

## 🚀 Core Features

- **AI Integration** : Chatbot assistant for academic Q&A and revision help.
- **User Profiles**: Academic-focused profiles with interests, goals, and availability.
- **Smart Matchmaking**: Match mentors, peers, and collaborators based on academic data.
- **Study Buddy Finder**: Connects users with similar interests for study collaboration.
- **Real-time Messaging**: Integrated chat using Socket.IO.
- **Document Sharing Hub**: Upload/download study materials, notes, and past papers.
- **Academic Event Calendar**: Join or host events, webinars, and group sessions.
- **Alumni & Career Corner**: Alumni post job/internship opportunities and offer mentorship.


---

## 🛠️ Tech Stack

| Layer        | Technologies Used                               |
|--------------|--------------------------------------------------|
| **Frontend** | React + TypeScript, Tailwind CSS, Lucide Icons   |
| **Backend**  | Node.js, Express.js                              |
| **Database** | MongoDB (with Mongoose)                          |
| **Auth**     | JWT or OAuth2                                    |
| **Chat**     | Socket.IO                                        |
| **File Storage** | Firebase Storage or AWS S3                   |
| **Hosting**  | Vercel (Frontend), Render/Heroku (Backend)       |

---

## 🎨 UI/UX Guidelines

- **Color Palette**:  
  - `#1E3A8A` (Trust Blue)  
  - `#0D9488` (Creative Teal)  
  - `#F97316` (Highlight Orange)
- Clean, card-based layout
- Role-based navigation
- Responsive Design with dark/light modes

---

## 📋 Project Structure


/client → Frontend (React, Tailwind)
/server → Backend (Express, MongoDB)
/models → Mongoose Models
/routes → API Endpoints
/socket → Socket.IO Configuration
/uploads → Resource Files (Firebase or S3)
.env → Environment Variables

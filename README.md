# Doctor's Appointment App

A modern web application for managing doctor appointments, built with React, TypeScript, and Firebase.

## Technologies Used

- React 18
- TypeScript 5.2+
- Vite 5.3+ (for fast development and building)
- React Redux Toolkit (for state management)
- React Router v6 (for routing)
- Firebase (for backend and authentication)

## Features

- User authentication (sign up, login, logout)
- Appointment scheduling and management
- Real-time updates using Firebase Realtime Database
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites used

- Node.js (20.11 or later)
- npm (10.2 or later)

### Installation

1. Clone the repository:

https://github.com/Hamza-HM/Doctor-s-Office-Management-System.git

2. Navigate to the project root directory:

3. Install dependencies for husky:

run: npm install

4. Navigate to the project directory: frontend

5. Install dependencies:

run : npm install

5. create an enviroment variables file : .env

6. copy these variables or your firebase app env variables:

VITE_APP_FIREBASE_API_KEY=AIzaSyC12WZg9cC9ZUy4uU5WSyBZmIsKObIh3Yc
VITE_APP_FIREBASE_AUTH_DOMAIN=medical-office-s-appointments.firebaseapp.com
VITE_APP_FIREBASE_DATABASE_URL=//medical-office-s-appointments-default-rtdb.europe-west1.firebasedatabase.app
VITE_APP_FIREBASE_PROJECT_ID=medical-office-s-appointments
VITE_APP_FIREBASE_STORAGE_BUCKET=medical-office-s-appointments.appspot.com
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=148331911135
VITE_APP_FIREBASE_APP_ID=1:148331911135:web:18e0c08a02ed105d6a166a

7. run server: npm run dev

8. build project: npm run build

note: husky will automatically build project and run typescript tests on commit

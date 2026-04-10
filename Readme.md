# 📝 Inotebook

**Inotebook** is a full-stack note-taking application designed to help users efficiently create, manage, and organize their notes. It provides a modern, responsive interface and a secure backend, making note-taking seamless and safe.  

---

## 🚀 Features

### 🔒 User Authentication
- Secure **signup** and **login** using JWT tokens  
- Passwords hashed with **bcrypt** for enhanced security  

### 🗒️ Note Management
- Create, read, update, and delete (**CRUD**) notes  
- Organize notes efficiently for better productivity  

### 💻 Frontend
- Built with **React**, **Vite**, and **React Router**  
- Responsive, user-friendly UI using **Bootstrap**  

### ⚙️ Backend
- **Express.js** server for handling API requests  
- **MongoDB** database with **Mongoose** for data storage  
- Secure **RESTful API** endpoints for note operations  

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- Vite  
- React Router  
- Bootstrap  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT for authentication  
- bcrypt for password hashing  

---

## ⚙️ Installation & Setup

Follow these steps to run **Inotebook** locally on your machine:

### 📁 1. Clone the Repository

```bash
git clone https://github.com/your-username/inotebook.git
cd inotebook
```

---

### 🔧 2. Setup Backend

```bash
cd Backend
npm install
```

#### ▶️ Run Backend Server

```bash
npm start
```

> The backend server will typically run on `http://localhost:5000`

---

### 💻 3. Setup Frontend

Open a new terminal and run:

```bash
cd Frontend
npm install
```

#### ▶️ Run Frontend App

```bash
npm run dev
```

> The frontend will typically run on `http://localhost:5173`

---

### 🔑 4. Environment Variables

Create a `.env` file inside the **Backend** folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### ✅ 5. You're Ready!

* Open your browser and go to `http://localhost:5173`
* Sign up and start creating notes 🚀


## 📌 Acknowledgements

A huge thank you to the amazing open-source community and libraries that made this project possible:  
🙏 Your contributions and inspiration keep the developer community thriving!  

---

## 🎯 Future Enhancements
- Add **tags/categories** for notes  
- **Search functionality**  
- **Dark mode** for the UI  
- **Collaborative notes** for multiple users  
-wait for changes


---

## 📄 License

This project is licensed under the **MIT License**.  

---

✨ Made with ❤️ by me.

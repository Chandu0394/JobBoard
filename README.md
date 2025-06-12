-----

# 🧑‍💻 JobBoard

**JobBoard** is a dynamic web application that empowers administrators to efficiently manage and publish job listings, while providing job seekers with easy access to the latest opportunities. Built with **Node.js**, **Express**, **MongoDB**, and **EJS**, it offers a streamlined interface, mobile responsiveness, and convenient social sharing features.

-----

## 📌 Description

Job seekers can discover the latest job openings through clean, publicly accessible URLs, making the application process straightforward. Meanwhile, authenticated administrators have exclusive control over posting, editing, and managing trending job listings, ensuring a secure and well-maintained platform.

-----

## 🚀 Features

  - ✅ Admin login with session-based authentication
  - 📝 Post, Edit, Delete job listings (admin only)
  - 🌍 Public job pages with clean slugs and "Apply Now" button
  - 📱 Responsive UI (Mobile + Desktop)
  - 🔐 Secure session management with timeout
  - 🔗 Social icons (LinkedIn & Telegram) in header
  - 🕒 "X days ago" timestamp for job recency

-----

## 🧰 Tech Stack

| Layer | Tools |
| :-------- | :------------------------------ |
| Backend | Node.js, Express |
| Frontend | EJS, HTML5, CSS3 |
| Database | MongoDB + Mongoose |
| Auth | express-session + connect-mongo |
| Utilities | bcrypt, dotenv, slugify |

-----

## 📁 Folder Structure

```
jobboard/
├── models/
│   └── Job.js
├── public/
│   ├── job.css
│   ├── linkedin.png
│   ├── telegram.png
│   └── favicon.ico
├── views/
│   ├── layout.ejs
│   ├── login.ejs
│   ├── post-job.ejs
│   ├── manage-jobs.ejs
│   ├── edit-job.ejs
│   └── job.ejs
├── .env
├── package.json
├── server.js
└── README.md
```

-----

## ⚙️ Setup Instructions (Local)

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/jobboard.git
    cd jobboard
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Create `.env` File**

    ```env
    MONGO_URI=mongodb://localhost:27017/jobboard
    SESSION_SECRET=your_secret
    ADMIN_USER=admin@example.com
    ADMIN_PASS_SECRET=your_hashed_or_plain_password
    ```

4.  **Run the App**

    ```bash
    npm run dev
    ```

5.  **Access the App**
    Open your browser at: `http://localhost:3000`

-----

## 🌐 Deployment on Netlify

> Netlify primarily hosts static sites. To deploy a full-stack Node.js application like JobBoard, you'll need to either separate your frontend and backend components or use an external hosting service for your backend.

### 🔁 Recommended Architecture

| Layer | Platform |
| :-------- | :------------------------ |
| Frontend | Netlify (views + static) |
| Backend | Render / Railway / Cyclic |
| Database | MongoDB Atlas |

### 🔗 Netlify + Render Example

1.  Deploy your `server.js` and API routes to **Render** as a web service.
2.  Deploy your `public/` and `views/` folders to **Netlify** to handle the frontend.
3.  Configure your Netlify frontend to make API calls to your Render-hosted backend.

-----

## 🔒 Admin Login

  * Email: as configured in `.env` → `ADMIN_USER`
  * Password: plain or hashed version from `ADMIN_PASS_SECRET`

-----

## 📸 Screenshots (Optional)

> *(Add images if you want, in README or Netlify site)*

-----

## 🧑‍💼 Author

**Chandu Dharmapuri**

  * [LinkedIn](https://www.linkedin.com/in/chandu-dharmapuri-0a3290207/)
  * [Telegram](https://t.me/fresherhiringgrads)

-----

## 📄 License

This project is licensed under the **MIT License** — free for personal and commercial use.
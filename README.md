# BookStoreAPI 📚

BookStoreAPI is a RESTful API for managing books and users in a bookstore. It
provides endpoints to perform CRUD operations on books and users, as well as
features like user authentication, password reset, and photo upload. 🌟

## Dependencies 📦

This project utilizes the following dependencies:

- 🚀 express : A fast and minimalist web framework for Node.js.
- 🤝 express-async-handler : A utility to handle asynchronous errors in Express
- 🍃 mongoose : A MongoDB object modeling tool for Node.js.
- 🔄 nodemon : A development utility for automatically restarting the server
- 🔒 bcryptjs : A library for hashing and comparing passwords securely.
- ️⚙️ dotenv : A module for loading environment variables from a `.env` file.
- ✅ joi : A validator library for validating and sanitizing data.
  middleware.
- 🎫 jsonwebtoken : A library for generating and verifying JSON Web Tokens (JWT).
- 🛡️ helmet : A middleware for securing Express apps with various HTTP headers.
- 🔐 joi-password-complexity : A plugin for Joi to enforce password complexity
  rules.
- 📷 multer : A middleware for handling file uploads.
- 📧 nodemailer : A module for sending emails.
  during development.

## Features ✨

The BookStoreAPI project provides the following features:

- User Management 👥:
    - Get all users 📋
    - Get a user by ID 🔍
    - Create a new user ➕
    - Update user details ✏️
    - Delete a user 🗑️
    - Assign admin privileges to a user 👑

- Book Management 📖:
    - Get all books 📚
    - Get a book by ID 🔍
    - Create a new book ➕
    - Update book details ✏️
    - Delete a book 🗑️

- Authentication and Password Reset 🔐:
    - User registration and login with JWT authentication 🚪
    - Password reset functionality using email verification 📧
    - Sending password reset links via Gmail service 📨

- Photo Upload 🖼️:
    - Upload and store user profile photos 📷

- Seeding 🌱:
    - Utilize a seeding function to import data from a JavaScript file 📥

## Getting Started 🚀

To get started with the BookStoreAPI project, follow these steps:

1. Clone the repository: `https://github.com/husamahmud/BookStoreAPI.git`
2. Install the dependencies: `npm install`
3. Set up the environment variables by creating a `.env` file based on the
   provided `.env.example` file.
   ```dotenv
    MONGO_URI=mongodb://localhost/BookStoreDB
    PORT=3000
    NODE_ENV=development
    SECRET_KEY=secret
    BASE_URL=http://localhost:3000
    USER_EMAIL=example@gmail.com
    USER_PASSWORD=app-password
   ```
4. Run the application: `npm start` (with nodemon for development)

Make sure you have MongoDB set up and running, and update the MongoDB connection
URL in the `.env` file.

## Author ✍️

- Hüsam Mahmud <[husamahmud](https://github.com/husamahmud)>

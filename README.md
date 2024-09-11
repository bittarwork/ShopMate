# ShopMate

**ShopMate** is a modern e-commerce platform built with React and Node.js, designed to offer an intuitive and seamless shopping experience. This platform allows users to browse products, manage their cart, and make purchases effortlessly.

## Features

- **Product Management**: Add, remove, and view products.
- **User Authentication**: Register, login, and manage user sessions.
- **Cart Management**: Add and remove items from the cart.
- **Image Uploads**: Upload and display product images.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.12.0 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed and running)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/shopmate.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd shopmate
   ```

3. **Install dependencies for the backend:**

   ```bash
   cd server
   npm install
   ```

4. **Install dependencies for the frontend:**

   ```bash
   cd ../client
   npm install
   ```

5. **Create a `.env` file in the `server` directory with the following content:**

   ```plaintext
   MONGO_URL=mongodb://127.0.0.1:27017/E
   PORT=5000
   ```

6. **Start the MongoDB server:**

   ```bash
   mongod
   ```

7. **Start the backend server:**

   ```bash
   cd ../server
   npm start
   ```

8. **Start the frontend server:**

   ```bash
   cd ../client
   npm start
   ```

## Usage

- **Frontend**: Open your browser and navigate to `http://localhost:3000` to access the application.
- **Backend API**: The backend API is available at `http://localhost:5000`. You can interact with endpoints like `/addproduct`, `/login`, and `/upload`.

## Contributing

We welcome contributions to enhance the project. Please follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch** for your feature or bug fix
3. **Commit your changes**
4. **Push your branch** to the forked repository
5. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [bittar.work@gmail.com] or open an issue in the [GitHub repository](https://github.com/BITTARWORK/shopmate/issues).

---

Thank you for using ShopMate! We hope you enjoy the shopping experience.

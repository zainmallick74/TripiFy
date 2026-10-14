# TripiFy – Explore Places to Stay

TripiFy is a full-stack web application inspired by travel and accommodation booking platforms. I built this project to strengthen my full-stack development skills and gain practical experience in building a complete web application, from handling user requests on the backend to storing and managing data in a database.

The platform allows travelers to explore accommodation listings, while registered users can create and manage listings and share their experiences through reviews.

## Features

- **User Authentication:** User registration, login, and session management.
- **Explore Listings:** Browse accommodation listings and view their details.
- **Listing Management:** Create, edit, and delete accommodation listings.
- **Reviews:** Allow users to share their experiences through reviews.
- **Image Uploads:** Upload and store listing images using Cloudinary.
- **Authorization:** Protect routes and restrict certain actions to authorized users.
- **Database Management:** Store and manage user, listing, and review data using MongoDB.
- **Session Management:** Maintain user sessions using Express sessions and MongoDB-backed storage.

## Tech Stack

**Backend**
- Node.js
- Express.js

**Frontend**
- HTML5
- CSS3
- JavaScript
- EJS (Embedded JavaScript Templates)

**Database and Authentication**
- MongoDB
- Mongoose
- Passport.js
- express-session
- connect-mongo

**Image Storage and Deployment**
- Cloudinary
- Render

## Project Structure

```text
TripiFy/
├── controllers/
├── init/
├── models/
├── public/
├── routes/
├── uploads/
├── utils/
├── views/
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB or a MongoDB Atlas account
- A Cloudinary account for image uploads

### 1. Clone the Repository

```bash
git clone https://github.com/zainmalllick74/TripiFy.git
```

### 2. Navigate to the Project Directory

```bash
cd TripiFy
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret
```

Replace the placeholder values with your actual credentials.

- `ATLASDB_URL` is your MongoDB connection string.
- `SECRET` is used for session-related security.
- `CLOUD_NAME`, `CLOUD_API`, and `CLOUD_SECRET` configure Cloudinary.

**Important:** Never upload your `.env` file or expose your database password, session secret, or Cloudinary API secret publicly.

### 5. Start the Application

If `app.js` is your application entry point and no start script is configured, run:

```bash
node app.js
```

Alternatively, use the start command defined in your `package.json`.

Open the local URL configured by the application in your browser.

## What I Learned

Building TripiFy helped me strengthen my understanding of full-stack development through practical implementation.

- Building server-side applications and handling HTTP requests with Express.js.
- Designing database schemas and performing database operations using MongoDB and Mongoose.
- Implementing authentication, authorization, and session management.
- Organizing application logic using routes, controllers, middleware, and utility modules.
- Integrating Cloudinary for image uploads.
- Managing environment variables and configuring a web application for deployment.
- Understanding how the frontend, backend, database, and external services work together.

## Future Improvements

I would like to continue improving TripiFy by introducing features such as:

- Advanced search, filtering, and sorting for accommodation listings.
- Interactive maps and location-based discovery.
- Improved mobile responsiveness and user experience.
- Additional security and performance optimizations.

## Project Links

- **GitHub Repository:** https://github.com/zainmallick74/TripiFy
- **Live Demo:** [https://tripify-demo.onrender.com](https://tripify-demr.onrender.com)

## About the Project

TripiFy is a hands-on full-stack development project built to apply web development concepts in a practical setting. Through this project, I gained experience connecting frontend templates with backend logic, managing persistent data, implementing authentication, and integrating third-party services.

The project represents my continued effort to improve my software development skills by building practical applications and learning through implementation.

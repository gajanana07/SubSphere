# SubSphere
A comprehensive, user-friendly platform for managing subscriptions and users, featuring robust authentication and authorization.
Visit this site: https://subsphere.netlify.app/

## Table of Contents
1. [Project Title and a short, engaging one-line description](#project-title-and-a-short-engaging-one-line-description)
2. [About The Project](#about-the-project)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Project Title and a short, engaging one-line description
A comprehensive, user-friendly platform for managing subscriptions and users, featuring robust authentication and authorization.

## About The Project
The SubSphere project is designed to provide a secure and efficient platform for managing subscriptions and users. It features a robust authentication system, including authorization for restricted pages and features. The platform is built with user experience in mind, making it easy for administrators to manage user subscriptions and track user activity.

## Tech Stack
* Client-side:
	+ JavaScript (using JSX)
	+ React
	+ Vite
	+ Tailwind CSS
	+ ESLint
* Server-side:
	+ Node.js
	+ Express
	+ Passport.js
	+ Mongoose (for MongoDB)

## Project Structure
The project is structured into two main folders: `client` and `server`.

### Client
The `client` folder contains the frontend code for the application. It includes the following folders:

* `src`: The source code for the application, including React components, CSS files, and JavaScript files.
* `public`: Static assets, such as images and SVG files.

### Server
The `server` folder contains the backend code for the application. It includes the following folders:

* `controllers`: Controller functions for handling requests and responses.
* `middleware`: Middleware functions for authentication and authorization.
* `models`: Mongoose models for interacting with the database.
* `routes`: Route handlers for handling HTTP requests.

## Getting Started
To get started with the project, follow these steps:

1. **Prerequisites**: Make sure you have Node.js (version 14 or higher) and npm (version 6 or higher) installed on your machine.
2. **Clone the repository**: Clone the SubSphere repository using the following command: `git clone https://github.com/your-username/subsphere.git`
3. **Install dependencies**: Navigate to the project root and run the following command: `npm install` or `yarn install`
4. **Start the client**: Run the following command to start the client: `npm run dev` or `yarn dev`
5. **Start the server**: Run the following command to start the server: `npm run server` or `yarn server`
6. **Access the application**: Open a web browser and navigate to `http://localhost:3000` to access the application.

## Usage
To use the application, follow these steps:

1. **Register a new user**: Click on the "Register" button on the homepage to create a new user account.
2. **Login to the application**: Enter your username and password to login to the application.
3. **Access restricted pages**: Once logged in, you can access restricted pages and features by clicking on the "Dashboard" button.
4. **Manage user subscriptions**: As an administrator, you can manage user subscriptions by clicking on the "Subscriptions" button.

## Contributing
Contributions to the SubSphere project are welcome. Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## License
The SubSphere project is licensed under the MIT License. Please refer to the [LICENSE.md](LICENSE.md) file for more information.

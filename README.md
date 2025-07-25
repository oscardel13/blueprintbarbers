# Blueprint Barbers

A full-stack web platform designed for a modern barbershop to manage e-commerce, appointments, and business content—without relying on third-party SaaS platforms. Built for performance, cost savings, and full control over the customer experience.

## 🚀 Features

- **Content Management System**  
  Admin dashboard for managing products, viewing orders, and updating barber profiles.

- **Custom Booking System**  
  Inspired by Booksy. Customers can view real-time availability and schedule appointments. Admins can manage time slots and services directly.

- **Smart Checkout System**  
  Inspired by Ticketmaster. Items in the cart are locked for a set period and automatically released if the user doesn't complete checkout. Payments are processed securely via Stripe.

- **Responsive, Mobile-First UI**  
  Built with Tailwind CSS to deliver a modern and accessible experience on any device.

- **Authentication with OAuth2**  
  Secure login via OAuth2 flow, enabling safe user sessions with access control.

- **Cloud-Hosted on AWS**  
  Deployed using AWS EC2 and S3 for reliable performance and scalability.

## 🧱 Tech Stack

| Area        | Tech                              |
|-------------|-----------------------------------|
| Frontend    | React, Tailwind CSS               |
| Backend     | Node.js, Express.js               |
| Database    | MongoDB (Mongoose ODM)            |
| Auth        | OAuth2 (via external identity provider) |
| Payments    | Stripe Checkout API               |
| Hosting     | AWS (EC2 for app, S3 for assets)  |
| Versioning  | Git, GitHub                       |

## 📁 Project Structure

blueprint-barbers/
├── client/ # React frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-based pages
│ └── tailwind.config.js # Tailwind setup
├── server/ # Express backend
│ ├── routes/ # API endpoints
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas via Mongoose
│ └── middleware/ # Auth and error handling
├── .env # Environment config
├── package.json # Project config
└── README.md # Project overview

bash
Copy
Edit

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/blueprint-barbers.git
   cd blueprint-barbers
Install dependencies

Client

bash
Copy
Edit
cd client
npm install
Server

bash
Copy
Edit
cd ../server
npm install
Environment configuration

Create a .env file in the server directory:

ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_key
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
SESSION_SECRET=your_session_secret
Run development servers

Frontend: npm run dev (inside client/)

Backend: npm run dev (inside server/)

Build for production (optional)

bash
Copy
Edit
npm run build
npm start
🔐 Security & Architecture
OAuth2 for secure user authentication and token-based sessions.

Checkout locks to prevent overselling, with automatic release on session timeout.

Mongoose for schema-based MongoDB data modeling.

Modular architecture for easy scaling and maintainability.


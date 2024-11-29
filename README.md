# Gammaw's Recipe Cards

A web application for storing and managing your favorite recipes. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- User authentication (signup/login)
- Create, read, update, and delete recipes
- Upload recipe images
- Store recipe details including:
  - Title
  - Ingredients
  - Instructions
  - Cooking time
  - Servings

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - Vanilla JavaScript
  - ES6 Modules
- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT Authentication
  - Multer for file uploads

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gammaws-recipe-cards.git
   cd gammaws-recipe-cards
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Visit http://localhost:3000 in your browser

## Project Structure

```
├── models/             # Database models
├── public/            # Static files
│   ├── css/          # Stylesheets
│   ├── js/           # Client-side JavaScript
│   └── uploads/      # Uploaded images
├── routes/           # API routes
├── server.js         # Main application file
└── package.json      # Project dependencies
```

## API Endpoints

### Authentication

- POST /api/auth/signup - Create a new user account
- POST /api/auth/login - Login to existing account

### Recipes

- GET /api/recipes - Get all recipes for logged in user
- GET /api/recipes/:id - Get a specific recipe
- POST /api/recipes - Create a new recipe
- PATCH /api/recipes/:id - Update a recipe
- DELETE /api/recipes/:id - Delete a recipe

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Nathan Clem

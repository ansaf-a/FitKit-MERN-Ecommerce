# FitKit - Fitness Products Store

FitKit is a beginner-friendly MERN fitness products store.

## Technology

- Frontend: React, Vite, JavaScript, JSX, React Router, Axios, normal CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: bcryptjs and JSON Web Tokens

## Run The Project

Make sure MongoDB is running at `mongodb://127.0.0.1:27017/fitkit`.

Terminal 1:

```bash
cd backend
npm install
npm run seed
npm start
```

Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173` or the port shown by Vite.
Backend: `http://localhost:5000`.

## Main Pages

- `/` Home
- `/products` Products, search, and category filters
- `/products/:id` Product details
- `/cart` Shopping cart
- `/checkout` Checkout form
- `/login` Login
- `/register` Registration
- `/my-orders` Logged-in user's orders
- `/admin` Admin product dashboard

## Important Notes

- The checkout is a demo and does not process real payments.
- Product create, update, and delete operations require a JWT belonging to an admin user.
- Do not commit `backend/.env`. Use `backend/.env.example` as a template.
- If an old backend process is already using port 5000, stop it before starting the current backend.

See [docs/POSTMAN.md](docs/POSTMAN.md) for API testing examples.

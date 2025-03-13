# museum-curator

## Tech Stack

- JavaScript (Backend)
- TypeScript (Frontend)

Frontend:

- Vite/React
- React Router
- TanStack Query
- Axios
- Shadcn/ui
- TablerIcons
- TailwindCSS
- React Hot Toast

Backend:

- Express
- SQLite
- Sequelize (ORM)
- Jest
- Supertest
- dotenv
- cors
- nodemon

Backend is currently hosted on Render:
https://museum-curator-api.onrender.com/api

Be aware there could be a 50 second delay as Render spins down instances that are unused. This will create an error when the web application trys to fetch data from the hosted backend.
Database does not persist across restarts, this is due to the project being an MVP. Instead production data is reseeded after every restart.

If running locally, please create a .env file in museum-curator/backend .
Inside add a "PORT=9090"
Please bare in mind that the frontend uses the hosted version of the backend.

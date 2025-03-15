# Museum Curator

A web application for curating and exploring museum artwork collections.

## Project Overview

Museum Curator allows users to browse artwork collections from various museums, create personal collections, and manage their favorite pieces. The application provides an intuitive interface for art enthusiasts to discover and organize artworks.

## GIF TO BE ADDED HERE

## Features

- Browse artwork from multiple museum collections.
- View detailed information about individual artworks.
- Create and manage personal collections.
- Add/remove artworks to/from collections.
- User-friendly interface with responsive design.
- Dark/light theme support.

## Tech Stack

- JavaScript (Backend)
- TypeScript (Frontend)

### Frontend

- Vite/React
- React Router
- TanStack Query
- Axios
- Shadcn/ui
- TablerIcons
- TailwindCSS
- React Hot Toast

### Backend

- Express
- SQLite
- Sequelize (ORM)
- Jest
- Supertest
- dotenv
- cors
- nodemon

## Live Demo

Frontend: [Museum Curator App](TBD)

Backend: [https://museum-curator-api.onrender.com/api](https://museum-curator-api.onrender.com/api)

## Installation & Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/museum-curator.git
cd museum-curator/backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following content:

```
PORT=9090
```

4. Start the development server

```bash
npm run dev
```

The backend will be available at `http://localhost:9090`.

### Frontend Setup

1. Navigate to the frontend directory

```bash
cd ../frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

**Note:** The frontend is configured to use the hosted version of the backend by default. If you want to use your local backend, you'll need to update the API base URL in the frontend configuration.

## Usage

1. Browse the both the harvard and cleveland galleries to explore artworks.
2. Click on artworks to see a more detailed view.
3. Add artworks to your collections.
4. Delete artworks from your collections.
5. Create, edit and delete a personal collection.
6. View individual collections with all the added artworks.

## Development

### Testing

#### Backend Tests

```bash
cd backend
npm run dev
```

```bash
cd backend
npm test
```

## Deployment

### Backend

The backend is currently hosted on Render: [https://museum-curator-api.onrender.com/api](https://museum-curator-api.onrender.com/api)

Be aware there could be a 50-second delay as Render spins down instances that are unused. This will create an error when the web application tries to fetch data from the hosted backend.

Database does not persist across restarts, this is due to the project being an MVP. Instead, production data is reseeded after every restart.

### Frontend

TBD

## Challenges & Solutions

- **Cold Start Delays**: The free tier on Render has cold start issues. Solution: Implemented loading states and error handling in the frontend.
- **Database Persistence**: Using SQLite with reseeding for the MVP phase. Future versions would implement a persistent database solution.
- **Cleveland API**: There is a rate limit with the Cleveland API, meaning I had to use sequential processing for Cleveland API and parallel processing for Harvard API.
- **Lack of Authentication**: The current MVP/Demo has a hardcoded user of "1" used throughout. Future versions would implement user authentication.

## Future Improvements

- User authentication and personalized collections.
- Allow artworks to be added to multiple collections at once.
- Advanced search and filtering options.
- Integration with additional museum APIs.
- Mobile application.

## Contributors

- Joe B ([@Rizq0](https://github.com/Rizq0))

## License

This project is licensed under the [MIT License](LICENSE).

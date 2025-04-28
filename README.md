# Museum Curator

<p align="center">
<img src="frontend/public/logo1.png" width="200" title="Login With Custom URL">
</p>

A web application for curating and exploring museum artwork collections.

## Project Overview

Museum Curator allows users to browse artwork collections from various museums, create personal collections, and manage their favourite pieces. The application provides an intuitive interface for art enthusiasts to discover and organize artworks.

## Demo

<p align="center">
<img src="frontend/public/demo.gif" width="100%" alt="Museum Curator Demo">
</p>

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

### Containerization & Continuous Integration and Deployment

- Docker
- GitHub Actions

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

Frontend: [Museum Curator App](https://museum-curator-web.netlify.app/)

Backend: [https://museum-curator-api.onrender.com/api](https://museum-curator-api.onrender.com/api)

## Installation & Setup

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Backend Setup

Request an Harvard Museum API key here: https://harvardartmuseums.org/collections/api

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
HARVARD_API_KEY="YOUR API KEY HERE"
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

**Note:** The local development frontend is configured to `http://localhost:9090/api` backend by default (which needs to be running). In production, it uses the hosted version on Render `https://museum-curator-api.onrender.com/api`.

## Docker Setup

Request an Harvard Museum API key here: https://harvardartmuseums.org/collections/api

1. Clone the repository

```bash
git clone https://github.com/yourusername/museum-curator.git
cd museum-curator
```

2. Create a `.env` file in the backend directory with the following content:

```
PORT=9090
HARVARD_API_KEY="YOUR API KEY HERE"
```

3. Build and run the backend and frontend using Docker

```
docker-compose up --build
```

This command will:

- Build the Docker images for both the backend and frontend.
- Start the backend on port 9090 and the frontend on port 5173.

Once the containers are up and running, the application will be accessible at:
<br> Backend: `http://localhost:9090/api` <br> Frontend: `http://localhost:5173/cleveland/1`

## Usage

1. Browse both the harvard and cleveland galleries to explore artworks.
2. Click on artworks to see a more detailed view.
3. Add artworks to your collections.
4. Delete artworks from your collections.
5. Create, edit, and delete a personal collection.
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

The database does not persist across restarts, this is due to the project being an Demo/MVP. Instead, production data is reseeded after every restart.

### Frontend

The frontend is currently hosted on Netlify: [Museum Curator Web](https://museum-curator-web.netlify.app/)

Due to the 50-second delay on the Render backend, error messages may appear until the backend server is running.

## Challenges & Solutions

- **Cold Start Delays**: The free tier on Render has cold start issues. I implemented loading states and error handling in the frontend as a solution.
- **Database Persistence**: Using SQLite with reseeding for the MVP phase. Future versions would implement a persistent database solution.
- **Cleveland API**: There is a rate limit with the Cleveland API, meaning I had to use sequential processing for Cleveland API and parallel processing for Harvard API.
- **API Proxy**: Due to the rate limits and cors errors with the Cleveland API, I decided to create a backend proxy to handle all external API calls.
- **Lack of Authentication**: The current MVP/Demo uses a hardcoded user ID "1" used throughout. Future versions would implement user authentication.

## Future Improvements

- User authentication and personalized collections.
- Allow artworks to be added to multiple collections at once.
- Advanced search and filtering options.
- Integration with additional museum APIs.
- Mobile application.

## Contributors

- Joe B - [GitHub](https://github.com/Rizq0) | [LinkedIn](https://www.linkedin.com/in/joe-brown0/) | [Portfolio](https://joedev.co.uk/)

## License

This project is licensed under the [MIT License](LICENSE).

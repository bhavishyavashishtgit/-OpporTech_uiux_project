
# Technical Opportunity Hub Prototype

This is a code bundle for the Technical Opportunity Hub Prototype.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Start the backend server in a separate terminal:
   ```bash
   npm run start:server
   ```

4. Open the app in your browser at:
   - Frontend: `http://localhost:5173`
   - Backend health: `http://localhost:4000/api/health`

   If you need access from another device on your network, use the host IP and port `5173` instead of `localhost`.

## Backend

The backend is implemented with Express and uses MongoDB by default.

- API base path: `/api`
- Auth routes: `/api/auth/login`, `/api/auth/signup`
- Profile route: `/api/user/profile`
- Health route: `/api/health`

### Environment variables

Copy `.env.example` to `.env` and configure values as needed.

- `VITE_API_BASE_URL`: Base URL for frontend API calls
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `VITE_GEMINI_API_KEY`: Gemini API key for AI chatbot support
- `VITE_GEMINI_API_URL`: Gemini endpoint URL

### In-memory fallback

If MongoDB is unavailable, the backend automatically falls back to an in-memory store.
This allows the server to stay up and continue serving auth requests during local development.

## Docker

A Docker setup is available for local development using `docker compose`.

To build and start the app stack:
```bash
docker compose up --build
```

This starts:
- `backend` on `http://localhost:4000`
- `frontend` on `http://localhost:5173`
- `mongo` on `mongodb://localhost:27017`

## Notes

- The health endpoint returns database state and whether the server is using the fallback memory store.
- If you see `database.state: disconnected` and `isFallback: true`, MongoDB is not running locally.
- Use `npm run start:server` for backend-only development.

## Troubleshooting

### 1. Backend returns 500

- Check `npm run start:server` terminal logs for stack traces.
- Verify the backend is running on `http://localhost:4000`.
- Confirm the request path is correct: `/api/auth/signup`, `/api/auth/login`, or `/api/user/profile`.
- If MongoDB is down, the backend falls back to memory storage, which still works for auth.

### 2. MongoDB connection errors

- Ensure MongoDB is running locally:
  ```bash
  docker compose up -d mongo
  ```
- Or install and start MongoDB on `mongodb://localhost:27017`.
- If you need persistence, set `MONGO_URI` in `.env`.

### 3. `database.state: disconnected` in health output

- This means the backend is running, but MongoDB is not connected.
- The backend will still start with the memory fallback, but data will not persist across restarts.

### 4. Frontend API request issues

- Check `VITE_API_BASE_URL` in `.env` or use the Vite proxy.
- If the frontend is served from `http://localhost:5173`, backend calls should go to `http://localhost:4000`.
- If you are accessing the app from another machine, start the frontend with host binding and use the host machine IP, for example `http://192.168.56.1:5173`.
- Look for CORS errors in the browser console if requests are blocked.

### 5. Docker compose problems

- Rebuild and restart:
  ```bash
  docker compose down --volumes
  docker compose up --build
  ```
- Confirm ports `4000`, `5173`, and `27017` are available.
- If the frontend cannot reach the backend inside Docker, verify `VITE_API_BASE_URL` is set to `http://localhost:4000`.
  
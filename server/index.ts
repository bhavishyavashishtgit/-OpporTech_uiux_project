import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
const port = Number(process.env.PORT || 4000);
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/opportech";

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "OpporTech backend is running." });
});

mongoose.set("strictQuery", true);
const startServer = () => {
  app.listen(port, () => {
    console.log(`Auth server listening on http://localhost:${port}`);
  });
};

app.use((req, res, _next) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled server error:", error);

  if (res.headersSent) {
    return next(error);
  }

  if (
    typeof error === "object" &&
    error !== null &&
    (error instanceof SyntaxError || error.type === "entity.parse.failed") &&
    typeof error.status === "number"
  ) {
    return res.status(error.status).json({ message: "Invalid JSON payload." });
  }

  const status = typeof error === "object" && error !== null && "status" in error && typeof error.status === "number"
    ? error.status
    : 500;

  const message = typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
    ? error.message
    : "Internal server error. Please try again later.";

  res.status(status).json({ message });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    startServer();
  })
  .catch((error) => {
    console.warn("Failed to connect to MongoDB, starting in fallback mode:", error);
    import("./repository/userRepository.js").then(({ setUseMemoryFallback }) => {
      setUseMemoryFallback(true);
      startServer();
    });
  });

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

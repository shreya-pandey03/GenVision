import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () => {
      console.log("Server is running on http://localhost:8080");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/user-routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use("/v1/api", userRoutes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server started at PORT ${PORT}`);
});
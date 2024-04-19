import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
// importing routes
import userRoutes from "./routes/userRoutes.js";

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

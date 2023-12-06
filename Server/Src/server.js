import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from '../Connection/connection.js'
import router from "../Routes/router.js"
const app = express();

app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
const port = process.env.PORT;

app.use("/user", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port|| 3001);

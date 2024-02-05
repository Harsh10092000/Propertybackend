import express from "express";
import cors from "cors";
import authLogin from "./routes/login.js";
import authProperty from "./routes/property.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use("/api/auth", authLogin);
app.use("/api/pro", authProperty);
app.use(express.static("./public"));
app.listen(8000, () => {
  console.log("App is running ");
});

import express from "express";
import cors from "cors";
import authLogin from "./routes/login.js";
import authProperty from "./routes/property.js";
import authAccount from "./routes/account.js";
import authContact from "./routes/contact.js";
import authAdmin from "./routes/admin.js";
const app = express();
app.use(express.static("./public"));

var whitelist = ["https://www.propertyease.in", "https://propertyease.in"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authLogin);
app.use("/api/act", authAccount);
app.use("/api/pro", authProperty);
app.use("/api/contact", authContact);
app.use("/api/admin", authAdmin);
app.listen(8010, () => {
  console.log("App is running ");
});

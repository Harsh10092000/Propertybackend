import express from "express";
import cors from "cors";
 
import authLogin from "./routes/login.js";
import authProperty from "./routes/property.js";
import authAccount from "./routes/account.js";
import authContact from "./routes/contact.js";
import authAdmin from "./routes/admin.js";
import authWatermark from "./routes/watermark.js"
import authWatermark2 from "./routes/watermark2.js"
import authPostRequirement from "./routes/postRequirement.js"
import authAgent from "./routes/agent.js"
import authAd from "./routes/ad.js"
import authProPlan from "./routes/proPlan.js"
import authMap from "./routes/map.js"
import authPay from "./routes/pay.js"
import "dotenv/config"
import cookieParser from 'cookie-parser';
import path from "path";
const app = express();
app.use(express.static("./public"));
app.use(cookieParser());


app.use(express.static(path.resolve(__dirname, "./build")))

// var whitelist = ["https://www.propertyease.in", "https://propertyease.in" , "http://localhost:8010" , "http://localhost:5173" ];
var whitelist = ["https://www.propertyease.in", "https://propertyease.in" ];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
      //callback(null, true);
    }
  },
};

// var allowlist = ['http://example1.com', 'http://example2.com']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authLogin);
app.use("/api/act", authAccount);
app.use("/api/pro", authProperty);
app.use("/api/contact", authContact);
app.use("/api/admin", authAdmin);
app.use("/api/watermark", authWatermark);
app.use("/api/watermark2", authWatermark2);
app.use("/api/postRequirement", authPostRequirement);
app.use("/api/agent", authAgent);
app.use("/api/ad", authAd);
app.use("/api/proPlan", authProPlan);
app.use("/api/cityMap", authMap);
app.use("/api/pay", authPay);

app.listen(8010, () => {
  console.log("App is running ");
});

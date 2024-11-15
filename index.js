// import express from "express";
// import cors from "cors";
// import cron from 'node-cron'; 
// import { SitemapStream, streamToPromise } from "sitemap";
// import { matchRoutes } from "react-router-config";
// //import { StaticRouter } from "react-router-dom";
// import routes from "./routes.js";

// import authLogin from "./routes/login.js";
// import authProperty from "./routes/property.js";
// import authAccount from "./routes/account.js";
// import authContact from "./routes/contact.js";
// import authAdmin from "./routes/admin.js";
// import authWatermark from "./routes/watermark.js"
// import authWatermark2 from "./routes/watermark2.js"
// import authPostRequirement from "./routes/postRequirement.js"
// import authAgent from "./routes/agent.js"
// import authAd from "./routes/ad.js"
// import authProPlan from "./routes/proPlan.js"
// import authMap from "./routes/map.js"
// import authPay from "./routes/pay.js"
// import authMailDigest from "./routes/maildigest.js"
// import "dotenv/config"
// import cookieParser from 'cookie-parser';
// import path from "path";
// import authSettings from "./routes/settings.js"
// import { maildigest } from "./controllers/maildigest.js";

// // import authCodeGen from "./routes/codeGeneration.js";
// import authInvite from "./routes/invite.js";

// import dotenv from 'dotenv';

// dotenv.config({ debug: true });

// const app = express();
// app.use(express.static("./public"));
// app.use(cookieParser());

// // const recipients = ["harshgupta.calinfo@gmail.com,harshwork1009@gmail.com"];
// // const batchSize = 50; // Number of emails to send in each batch
// // const delay = 2000; // Delay between batches in milliseconds (e.g., 2 seconds)

// // cron.schedule(`${process.env.BROADCAST_EMAIL_MIN} ${process.env.BROADCAST_EMAIL_HR} */${process.env.BROADCAST_EMAIL_DAYS} * *`, () => {
// //   maildigest();
// //   console.log("mail sent");
// // });


// //cron.schedule(`5 * * * * *`, () => {
// //   cron.schedule('*/10 * * * * *', () => {
// //   maildigest();
// //   console.log("mail sent");
// // });


// // app.use(express.static(path.resolve(process.cwd(), "./build")));

// var whitelist = ["https://www.propertyease.in", "https://propertyease.in" , "http://localhost:8010" , "http://localhost:3000" , "http://localhost:5173" ];
// //var whitelist = ["https://www.propertyease.in", "https://propertyease.in" ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//       //callback(null, true);
//     }
//   },
// };

// // var allowlist = ['http://example1.com', 'http://example2.com']
// // var corsOptionsDelegate = function (req, callback) {
// //   var corsOptions;
// //   if (allowlist.indexOf(req.header('Origin')) !== -1) {
// //     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
// //   } else {
// //     corsOptions = { origin: false } // disable CORS for this request
// //   }
// //   callback(null, corsOptions) // callback expects two parameters: error and options
// // }


// // app.get('/sitemap.xml', (req, res) => {
// //   console.log('Current path:', req.path);
  
// //   const sitemap = new SitemapStream({ hostname: 'https://propertyease.in' });
  
// //   try {
// //     const matchedRoutes = matchRoutes(routes, req.path);
// //     console.log('Matched routes:', matchedRoutes);
    
// //     matchedRoutes.forEach(({ route }) => {
// //       sitemap.write({ url: route.path, changefreq: 'monthly', priority: 0.7 });
// //     });
// //   } catch (error) {
// //     console.error('Error matching routes:', error);
// //     return res.status(500).send('Internal Server Error');
// //   }

// //   sitemap.end();
// //   streamToPromise(sitemap).then((sm) => {
// //     res.header('Content-Type', 'application/xml');
// //     res.send(sm);
// //   });
// // });

// app.get('/sitemap.xml', (req, res) => {
//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset
//       xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//       xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
//             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//   <url>
//     <loc>https://propertyease.in/</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/allproperties</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/contactus</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/postrequirement</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/listing/commercial</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/listing/land</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/listing/residential</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/citymap/Kurukshetra</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/agentlist</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/DC-Rates-2024-25.pdf</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/privacypolicy</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/termsandconditions</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/quick-list</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/addproperty</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/residential/apartment</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/land/residential-land</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/commercial/commercial-building</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/residential/independent-house</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/land/agricultural-land</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
//   <url>
//     <loc>https://propertyease.in/commercial/retail-showroom1</loc>
//     <lastmod>2024-09-30T05:21:58+00:00</lastmod>
//   </url>
// </urlset>`;

//   res.header('Content-Type', 'application/xml');
//   res.send(sitemap);
// });



// app.use(cors(corsOptions));
// app.use(express.json());
// app.use("/api/auth", authLogin);
// app.use("/api/act", authAccount);
// app.use("/api/pro", authProperty);
// app.use("/api/contact", authContact);
// app.use("/api/admin", authAdmin);
// app.use("/api/watermark", authWatermark);
// app.use("/api/watermark2", authWatermark2);
// app.use("/api/postRequirement", authPostRequirement);
// app.use("/api/agent", authAgent);
// app.use("/api/ad", authAd);
// app.use("/api/proPlan", authProPlan);
// app.use("/api/cityMap", authMap);
// app.use("/api/pay", authPay);
// app.use("/api/setting", authSettings);
// app.use("/api/maildigest", authMailDigest);
// // app.use("/api/gencode", authCodeGen);
// app.use("/api/invite", authInvite);

// app.listen(8010, () => {
//   console.log("App is running ");
// });










import express from "express";
import cors from "cors";
import cron from 'node-cron'; 
import fs from 'fs';

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
import authMailDigest from "./routes/maildigest.js"
import "dotenv/config"
import cookieParser from 'cookie-parser';
import path from "path";
import authSettings from "./routes/settings.js"
import { maildigest } from "./controllers/maildigest.js";

// import authCodeGen from "./routes/codeGeneration.js";
import authInvite from "./routes/invite.js";

import dotenv from 'dotenv';

dotenv.config({ debug: true });

const app = express();
app.use(express.static("./public"));
app.use(cookieParser());

// const recipients = ["harshgupta.calinfo@gmail.com,harshwork1009@gmail.com"];
// const batchSize = 50; // Number of emails to send in each batch
// const delay = 2000; // Delay between batches in milliseconds (e.g., 2 seconds)

// cron.schedule(`${process.env.BROADCAST_EMAIL_MIN} ${process.env.BROADCAST_EMAIL_HR} */${process.env.BROADCAST_EMAIL_DAYS} * *`, () => {
//   maildigest();
//   console.log("mail sent");
// });


//cron.schedule(`5 * * * * *`, () => {
//   cron.schedule('*/10 * * * * *', () => {
//   maildigest();
//   console.log("mail sent");
// });


// app.use(express.static(path.resolve(process.cwd(), "./build")));

var whitelist = ["https://www.propertyease.in", "https://propertyease.in" , "http://localhost:8010" , "http://localhost:3000" , "http://localhost:5173", "https://box-and-move.vercel.app" ];
//var whitelist = ["https://www.propertyease.in", "https://propertyease.in" ];
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
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
// app.get('/redirection', (req, res) => {
//   const filePath = 'Redirection.json'; // Ensure this is the correct path to your file
  
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error("Error reading the file:", err);
//       return res.status(500).json({ error: 'Failed to read file' });
//     }

//     try {
//       const jsonData = JSON.parse(data);  
//       console.log("Redirection Data:", jsonData); 
//       res.setHeader('Content-Type', 'application/json'); 
//       return res.status(200).json(jsonData); 
//     } catch (parseError) {
//       console.error("Error parsing JSON:", parseError);
//       return res.status(500).json({ error: 'Failed to parse JSON' });
//     }
//   });
// });

app.use(cors(corsOptions));
//app.use(cors());
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
app.use("/api/setting", authSettings);
app.use("/api/maildigest", authMailDigest);
// app.use("/api/gencode", authCodeGen);
app.use("/api/invite", authInvite);

app.listen(8010, () => {
  console.log("App is running ");
});
// import express from "express";
// import cors from "cors";
// import authLogin from "./routes/login.js";
// import authProperty from "./routes/property.js";
// import authAccount from "./routes/account.js";
// import authContact from "./routes/contact.js";
// const app = express();

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   })
// );
// app.use(express.json());
// app.use("/api/auth", authLogin);
// app.use("/api/act", authAccount);
// app.use("/api/pro", authProperty);
// app.use("/api/contact", authContact);
// app.use(express.static("./public"));
// app.listen(8010, () => {
//   console.log("App is running ");
// });

import express from "express";
import cors from "cors";
import authLogin from "./routes/login.js";
import authProperty from "./routes/property.js";
import authAccount from "./routes/account.js";
import authContact from "./routes/contact.js";

import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { Readable } from "stream";

const app = express();
let sitemap;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.get("/sitemap.xml", function (req, res) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({
      hostname: "http://51.79.161.51:4174/",
    });
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    smStream.write({
      url: "/allproperties",
      changefreq: "daily",
      priority: 0.3,
    });
    smStream.write({
      url: "/addproperty/",
      changefreq: "monthly",
      priority: 0.7,
    });
    smStream.write({ url: "/listing/residential" }); // changefreq: 'weekly',  priority: 0.5
    smStream.write({ url: "/listing/land", img: "http://urltest.com" });
    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end();
    // stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

app.listen(8010, () => {
  console.log("App is running ");
});

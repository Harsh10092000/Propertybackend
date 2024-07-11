import nodemailer from "nodemailer";
import "dotenv/config";

// export const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "noreply@propertyease.in",
//     pass: "Property@123",
//   },
// });


export const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


export const digesttransporter = nodemailer.createTransport({
  host: process.env.BROADCAST_HOST,
  port: process.env.BROADCAST_PORT,
  secure: false,
  auth: {
    user: process.env.BROADCAST_EMAIL,
    pass: process.env.BROADCAST_PASSWORD,
  },
});


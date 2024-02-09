import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: "noreply@propertyease.in",
    pass: "Property@123",
  },
});

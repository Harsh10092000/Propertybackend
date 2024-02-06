import { transporter } from "../nodemailer.js";
import { db } from "../connect.js";

const updateOtp = (otp, email, res) => {
  const q = "update login_module set login_otp = ? where login_email = ?";
  db.query(q, [otp, email], (err, data) => {
    if (err) return res.status(500).json(err);
  });
};

export const sendOtp = (req, res) => {
  var otp = Math.floor(100000 + Math.random() * 900000);
  let info = {
    from: '"Khataease " <noreply@khataease.com>', // sender address
    to: req.params.email, // list of receivers
    subject: "Khataease", // Subject line
    html: `Otp is <b>${otp}</b> and you can use this to login into our system`, // html body
  };

  const query1 =
    "select count(login_id) as count_login_id from login_module where login_email = ?";
  db.query(query1, [req.params.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data[0].count_login_id !== 0) {
      updateOtp(otp, req.params.email);
      transporter.sendMail(info, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Otp Sent");
      });
    } else {
      return res.status(409).json("Email doesn't Exist");
    }
  });
};

export const checkLogin = (req, res) => {
  const q =
    "SELECT * from login_module WHERE login_email = ? and login_otp = ?";
  db.query(q, [req.body.inputs.email, req.body.inputs.otp], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json("Login Failed");
    }
  });
};

export const fetchLoginData = (req, res) => {
  const q = "SELECT * from login_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  var otp = Math.floor(100000 + Math.random() * 900000);
  let info = {
    from: '"Khataease " <noreply@khataease.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Khataease", // Subject line
    html: `Otp is <b>${otp}</b> and you can use this to login into our system`, // html body
  };

  const query1 =
    "INSERT INTO login_module (login_email, login_number, login_otp) Values (?)";
  const values = [req.body.email, req.body.phone, otp];
  db.query(query1, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    transporter.sendMail(info, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(otp);
    });
  });
};

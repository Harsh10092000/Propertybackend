// import { transporter } from "../nodemailer.js";
// import { db } from "../connect.js";

// const updateOtp = (otp, email, res) => {
//   const q = "update login_module set login_otp = ? where login_email = ?";
//   db.query(q, [otp, email], (err, data) => {
//     if (err) return res.status(500).json(err);
//   });
// };

// export const sendOtp = (req, res) => {
//   var otp = Math.floor(100000 + Math.random() * 900000);
//   let info = {
//     from: '"Khataease " <noreply@khataease.com>', // sender address
//     to: req.params.email, // list of receivers
//     subject: "Khataease", // Subject line
//     html: `Otp is <b>${otp}</b> and you can use this to login into our system`, // html body
//   };
  
//   const query1 =
//     "select count(login_id) as count_login_id from login_module where login_email = ?";
//   db.query(query1, [req.params.email], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data[0].count_login_id !== 0) {
//       updateOtp(otp, req.params.email);
//       transporter.sendMail(info, (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json(otp);
//       });
//     } 
//     else {
//       console.log("Email not exists ");
//       return res.status(200).json("Email Not Exists");
//     }
//   });
// };


// export const checkLogin = (req, res) => {
//     const q = "SELECT * from login_module WHERE login_email = ? and login_otp = ?";
//     db.query(q, [req.body.email, req.body.otp], (err, data) => {
//       if (err) return res.status(500).json(err);
//       if (data.length > 0) {
//         return res.status(500).json("Login Successful")
//       } else {
//         return res.status(200).json("Login Failed");
//       }
//     });
//   };



// export const fetchLoginData = (req, res) => {
//   const q = "SELECT * from login_module";
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };




// export const addUser = (req, res) => {
//   const checkEmail = "select * from register_module where reg_email = ?";
//   db.query(checkEmail, [req.body.reg_email], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length === 0) {
//       const query1 =
//         "INSERT INTO register_module (reg_name, reg_email, reg_phone) Values (?)";
//       const values = [
//         req.body.reg_name,
//         req.body.reg_email,
//         req.body.reg_phone,
//       ];
//       db.query(query1, [values], (err, data) => {
//         if (err) return res.status(500).json(err);
//         const query2 = "INSERT INTO login_module (login_email) Values (?)";
//         db.query(query2, [req.body.reg_email], (err, data) => {
//           if (err) return res.status(500).json(err);
//           return res.status(200).json("Inserted");
//         });
//       });
//     } else {
//       return res.status(200).json("Email Already Exists");
//     }
//   });
// };


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
        return res.status(200).json(otp);
      });
    } else {
      return res.status(409).json("Email doesn't Exist");
    }
  });
};

export const checkLogin = (req, res) => {
  console.log(req.body.inputs);
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
  const checkEmail = "select * from register_module where reg_email = ?";
  db.query(checkEmail, [req.body.reg_email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      const query1 =
        "INSERT INTO register_module (reg_name, reg_email, reg_phone) Values (?)";
      const values = [
        req.body.reg_name,
        req.body.reg_email,
        req.body.reg_phone,
      ];
      db.query(query1, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        const query2 = "INSERT INTO login_module (login_email) Values (?)";
        db.query(query2, [req.body.reg_email], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("Inserted");
        });
      });
    } else {
      return res.status(409).json("Email Already Exists");
    }
  });
};

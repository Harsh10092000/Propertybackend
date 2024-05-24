//import jwt from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

import cookieParser from 'cookie-parser';

const secretKey = "sdfhj@j13j24";
const secretKey1 = "fghf12223";

const hashOtp = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const genrateAccessToken = async (reqbody, res) => {
  try {
        const hashedOTP = await hashOtp(reqbody[0].login_otp);
        const payload = {
          login_id: reqbody[0].login_id,
          login_email: reqbody[0].login_email,
          login_otp: hashedOTP,
          login_number: reqbody[0].login_number,
          //user_type: reqbody[0].user_type,
        };

    
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "15d",
    });

    const refreshToken = jwt.sign({
      login_otp: hashedOTP,
  }, secretKey, { expiresIn: '1d' });

    console.log(token,refreshToken);
    // res.cookie('jwt' , refreshToken , {httponly: true, maxAge : 24 * 60 * 60 * 1000})
    try {


      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      console.log("saved in cookie");
  } catch (error) {
    
      console.error('Error occurred:', error);
  }
    const decodedToken = jwtDecode(token);
    const expiresAt = decodedToken.exp;
    console.log("decodedToken : ", decodedToken);
    //const verifiedToken = jwt.verify(token, secretKey1);
    //console.log("verifiedToken : " , verifiedToken);

    try {
      const verifiedToken = jwt.verify(token, secretKey);
      console.log("verifiedToken : ", verifiedToken);
      return { message: "Authentication successful!", token, expiresAt, refreshToken };
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  } catch (error) {
    return error;
  }
};

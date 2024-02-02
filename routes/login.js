import express from "express";
import {
    fetchLoginData,
    addUser,
    sendOtp,
    checkLogin,
} from "../controllers/login.js";
const router = express.Router();

router.get("/fetchLoginData", fetchLoginData);
router.post("/addUser", addUser);
router.get("/sendOtp/:email", sendOtp);
router.post("/checkLogin", checkLogin);

export default router;

import express from "express";
import {
    fetchUserData,
    delData,
} from "../controllers/account.js";

const router = express.Router();

router.get("/fetchUserData/:userEmail", fetchUserData);
router.delete("/delData/:userEmail/:userId",delData);


export default router;

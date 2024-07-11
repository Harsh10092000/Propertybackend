import express from "express";
import { addSubscriberData } from "../controllers/maildigest.js";


const router = express.Router();

router.post("/addSubscriberData", addSubscriberData);

export default router;
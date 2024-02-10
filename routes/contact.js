import express from "express";
import { askquestion } from "../controllers/contact.js";

const router = express.Router();

router.post("/askquestion", askquestion);

export default router;

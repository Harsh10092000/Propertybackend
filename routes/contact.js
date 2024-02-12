import express from "express";
import { askquestion, freeEnquiry } from "../controllers/contact.js";

const router = express.Router();

router.post("/askquestion", askquestion);
router.post("/freeEnquiry", freeEnquiry);
export default router;

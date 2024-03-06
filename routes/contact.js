import express from "express";
import { askquestion, freeEnquiry, interestShowed } from "../controllers/contact.js";

const router = express.Router();

router.post("/askquestion", askquestion);
router.post("/freeEnquiry", freeEnquiry);
router.post("/interestShowed", interestShowed);
export default router;

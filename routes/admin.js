import express from "express";
import { fetchAll, fetchInterested } from "../controllers/admin.js";
import { deleteProperty } from "../controllers/admin.js";

const router = express.Router();

router.get("/fetchAll", fetchAll);
router.delete("/deletePro/:proId", deleteProperty);
router.get("/fetchInterested", fetchInterested);
export default router;

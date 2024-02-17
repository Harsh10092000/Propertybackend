import express from "express";
import { fetchAll } from "../controllers/admin.js";
import { deleteProperty } from "../controllers/admin.js";

const router = express.Router();

router.get("/fetchAll", fetchAll);
router.delete("/deletePro/:proId", deleteProperty);
export default router;

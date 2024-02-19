import express from "express";
import { fetchAll, fetchInterested, fetchUsers } from "../controllers/admin.js";
import { deleteProperty } from "../controllers/admin.js";

const router = express.Router();

router.get("/fetchAll", fetchAll);
router.delete("/deletePro/:proId", deleteProperty);
router.get("/fetchInterested", fetchInterested);
router.get("/fetchUsers", fetchUsers);
export default router;

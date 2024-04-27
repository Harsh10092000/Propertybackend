import express from "express";
import { addProPlan, updateProPlan, fetchProPlanData,fetchProPlanDataById, updateProPlanStatus, deleteProPlan } from "../controllers/proPlan.js";

const router = express.Router();

router.post("/addProPlan", addProPlan);
router.put("/updateProPlan", updateProPlan);
router.get("/fetchProPlanData", fetchProPlanData);
router.get("/fetchProPlanDataById/:planId", fetchProPlanDataById);
router.put("/updateProPlanStatus", updateProPlanStatus);
router.delete("/deleteProPlan/:planId", deleteProPlan);
export default router;

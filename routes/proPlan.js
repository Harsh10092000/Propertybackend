import express from "express";
import { addProPlan, updateProPlan, fetchProPlanData,fetchProPlanDataById, updateProPlanStatus, deleteProPlan, buyProPlan,fetchProPlanDataBId, fetchProPlanTran } from "../controllers/proPlan.js";
import { verifyJwt } from "../controllers/verifyjwt.js";

const router = express.Router();

router.post("/addProPlan", addProPlan);
router.post("/buyProPlan", buyProPlan);
router.put("/updateProPlan", updateProPlan);
router.get("/fetchProPlanData", fetchProPlanData);
router.get("/fetchProPlanDataById/:planId", fetchProPlanDataById);
router.get("/fetchProPlanDataBId/:userId",verifyJwt , fetchProPlanDataBId);
router.put("/updateProPlanStatus", updateProPlanStatus);
router.delete("/deleteProPlan/:planId", deleteProPlan);
router.get("/fetchProPlanTran", fetchProPlanTran);

export default router;

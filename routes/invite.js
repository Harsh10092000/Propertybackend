import express from "express";
import { adminInvite, getMailContactList, addSingleMail, deleteMailContact } from "../controllers/invite.js";

const router = express.Router();
router.post("/adminInvite", adminInvite);
router.get("/getMailContactList", getMailContactList);
router.post("/addSingleMail", addSingleMail);
router.delete("/deleteMailContact/:mailId", deleteMailContact);


export default router;

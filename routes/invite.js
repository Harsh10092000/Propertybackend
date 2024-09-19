import express from "express";
<<<<<<< HEAD
import { adminInvite, getMailContactList, addSingleMail, deleteMailContact } from "../controllers/invite.js";
=======
import { adminInvite, userInvite, getMailContactList, addSingleMail, deleteMailContact, getMailContent } from "../controllers/invite.js";
>>>>>>> 26689bff8e1eeb9b45f17db65e5ccbda5c80a153

const router = express.Router();
router.post("/adminInvite", adminInvite);
router.get("/getMailContactList", getMailContactList);
router.post("/addSingleMail", addSingleMail);
router.delete("/deleteMailContact/:mailId", deleteMailContact);
router.get("/getMailContent", getMailContent)


export default router;

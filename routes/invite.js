import express from "express";
import { adminInvite, userInvite, getMailContactList, addSingleMail, deleteMailContact, 
    //getMailContent 
} from "../controllers/invite.js";

const router = express.Router();
router.post("/adminInvite", adminInvite);
router.post("/userInvite", userInvite);
router.get("/getMailContactList", getMailContactList);
router.post("/addSingleMail", addSingleMail);
router.delete("/deleteMailContact/:mailId", deleteMailContact);
//router.get("/getMailContent", getMailContent)


export default router;

import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { adminInvite, getMailContactList, addSingleMail, deleteMailContact } from "../controllers/invite.js";
=======
import { adminInvite, userInvite, getMailContactList, addSingleMail, deleteMailContact, getMailContent } from "../controllers/invite.js";
>>>>>>> 26689bff8e1eeb9b45f17db65e5ccbda5c80a153
=======
import { adminInvite, userInvite, getMailContactList, addSingleMail, deleteMailContact, 
    //getMailContent 
} from "../controllers/invite.js";
>>>>>>> 3ac534e5fe04cceae8919c5f3c1400eb71c175d3
=======
import { adminInvite, userInvite, getMailContactList, addSingleMail, deleteMailContact, getMailContent } from "../controllers/invite.js";
>>>>>>> 7d39c145a6e2ac3563a5517c0bc8f16091997e5f

const router = express.Router();
router.post("/adminInvite", adminInvite);
router.get("/getMailContactList", getMailContactList);
router.post("/addSingleMail", addSingleMail);
router.delete("/deleteMailContact/:mailId", deleteMailContact);
router.get("/getMailContent", getMailContent)


export default router;

import express from "express";
import {
  addAgent,
  fetchAgentWorkPlace,
  fetchAgentData,
} from "../controllers/agent.js";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";
const router = express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/propertyImages");
//   },
//   filename: (req, file, cb) => {
//     let tempName = Date.now() + "-" + file.originalname;
//     fileArr.push(tempName);
//     cb(null, tempName);
//   },
// });

// const upload = multer({
//   storage,
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/userImages");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
});


router.post("/addAgent", upload.single("image"), (req, res) => {
  console.log("req.body : ", req.body);
  console.log("req.file : ", req.file);
  const q =
    "INSERT INTO agent_module (agent_name, agent_email, agent_phone , agent_exp, agent_work_area ,agent_state, agent_city, agent_sub_district, agent_locality, agent_comapnay_name, agent_company_website, agent_desc, agent_inage ) Values (?)";
  const values = [
    req.body.user_name,
    req.body.user_email,
    req.body.user_phone,
    req.body.user_exp,
    req.body.user_work_area,
    req.body.user_state,
    req.body.user_city,
    req.body.user_sub_district,
    req.body.user_locality,
    req.body.user_comapnay_name,
    req.body.user_company_website,

    req.body.user_desc,
    req.file ? req.file.filename : "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    console.log(insertId);
    const q1 =
      "INSERT INTO agent_work_state_city (  `work_state`, `work_city`, `agent_cnct_id`) Values ?";
    const userWorkCity = JSON.parse(req.body.user_work_city);
    const values1 = userWorkCity.map((values) => [
      values.state,
      values.district,
      insertId,
    ]);
    console.log("values1 :", values1);
    db.query(q1, [values1], (err, data) => {
      if (err) return res.status(500).json(err);
      //return res.status(200).json("Data has been entered");
      const q2 = 
      "INSERT INTO agent_work_city__subdistrict (  `work_city`, `work_sub_district`, `agent_cnct_id`) Values ?";
      const userWorkSubDistrict = JSON.parse(req.body.user_work_sub_district);
    const values2 = userWorkSubDistrict.map((values) => [
      values.district,
      values.sub_district,
      insertId,
    ]);
    console.log("values2 :", values2);
    db.query(q2, [values2], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(insertId);
    });
  });
});
});

//router.post("/addAgent", addAgent);
router.get("/fetchAgentData/:agentId", fetchAgentData);
router.get("/fetchAgentWorkPlace/:agentId", fetchAgentWorkPlace);
export default router;

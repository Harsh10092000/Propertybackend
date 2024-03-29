import { db } from "../connect.js";





export const addAgent = (req, res) => {
  console.log(req.body)
  const q =
    "INSERT INTO agent_module (agent_name, agent_email, agent_phone , agent_exp, agent_work_area ,agent_state, agent_city, agent_sub_district, agent_locality, agent_comapnay_name, agent_company_website, agent_desc ) Values (?)";
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
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    console.log(insertId);
    const q1 =
      "INSERT INTO agent_work_state_city (  `work_state`, `work_city`, `agent_cnct_id`) Values ?";
    const values1 = req.body.user_work_city.map((values) => [
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
    const values2 = req.body.user_work_sub_district.map((values) => [
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
};



export const fetchAgentData = (req, res) => {
  console.log("req.params.agentId : " , req.params.agentId)
  const q =
    "SELECT * FROM agent_module where agent_id = ?;";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// export const fetchAgentWorkPlace = (req, res) => {
//   const q = "select agent_work_state_city.agent_cnct_id, agent_work_state_city.work_state, agent_work_state_city.work_city, agent_work_city__subdistrict.work_sub_district from agent_work_city__subdistrict left join agent_work_state_city on agent_work_state_city.work_city = agent_work_city__subdistrict.work_city where agent_work_state_city.agent_cnct_id = ?";
//   db.query(q, [req.params.agentId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };

export const fetchAgentWorkPlace = (req, res) => {
  const q = "SELECT agent_cnct_id, work_city,GROUP_CONCAT( work_sub_district ) as work_sub_district FROM agent_work_city__subdistrict where agent_cnct_id = ? group by work_city";
  db.query(q, [req.params.agentId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
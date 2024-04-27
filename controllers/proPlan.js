import { db } from "../connect.js";


export const addProPlan = (req, res) => {
  const q =
    "INSERT INTO list_property_plans ( pro_plan_name, pro_plan_amt , pro_plan_validity) Values (?)";
  const values = [
    req.body.pro_plan_name,
    req.body.pro_plan_amt,
    req.body.pro_plan_validity,
  ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
};


export const updateProPlan = (req, res) => {
    const q =
      "UPDATE list_property_plans SET pro_plan_name = ?, pro_plan_amt = ?, pro_plan_validity = ? WHERE pro_plan_id = ?"
    const values = [
      req.body.pro_plan_name,
      req.body.pro_plan_amt,
      req.body.pro_plan_validity,
      req.body.pro_plan_id,
    ];
      db.query(q, [values], (err, data) => {
        console.log(values);
        if (err) return res.status(500).json(err);
        return res.status(200).json("Updated Successfully");
      });
  };


export const fetchProPlanData = (req, res) => {
  const q = "SELECT * FROM list_property_plans";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};



export const fetchProPlanDataById = (req, res) => {
    const q = "SELECT * FROM list_property_plans WHERE pro_plan_id = ?";
    db.query(q, [req.params.planId] , (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };

  export const deleteProPlan = (req, res) => {
    const q =
      "DELETE list_property_plans from list_property_plans WHERE pro_plan_id = ?";
    db.query(q, [req.params.planId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("DELETED");
    });
  };
  
  
  export const updateProPlanStatus = (req, res) => {
    const q = "UPDATE list_property_plans SET pro_plan_listed = ? WHERE pro_plan_id = ?";
    const values = [req.body.pro_plan_listed, req.body.pro_plan_id];
    db.query(q, values, (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Updated Successfully");
    });
  };
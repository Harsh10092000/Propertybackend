import { db } from "../connect.js";


export const addProPlan = (req, res) => {
  const q =
    "INSERT INTO list_property_plans ( pro_plan_name, pro_plan_amt , pro_plan_validity, pro_plan_property_slots) Values (?)";
  const values = [
    req.body.pro_plan_name,
    req.body.pro_plan_amt,
    req.body.pro_plan_validity,
    req.body.pro_plan_list_no,
    req.body.plan_status,
    req.body.order_id,
    req.body.payment_id,
  ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
    });
};


export const updateProPlan = (req, res) => {
    const q =
      "UPDATE list_property_plans SET pro_plan_name = ?, pro_plan_amt = ?, pro_plan_validity = ?, pro_plan_property_slots = ? WHERE pro_plan_id = ?"
    const values = [
      req.body.pro_plan_name,
      req.body.pro_plan_amt,
      req.body.pro_plan_validity,
      req.body.pro_plan_list_no,
      req.body.pro_plan_id,
    ];
      db.query(q, values, (err, data) => {
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


export const fetchProPlanDataBId = (req, res) => {
  const q = "SELECT * FROM list_plan_transactions where user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchProPlanTran = (req, res) => {
  const q = "SELECT * FROM list_plan_transactions";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const buyProPlan = (req, res) => {
  const q =
    "INSERT INTO list_plan_transactions ( list_plan_id, plan_name, tran_amt, user_id, list_plan_valid_for_days, pro_plan_added_slots, plan_status, order_id, payment_id, payment_status, payment_discount, original_price) Values (?)";
  const values = [
    req.body.list_plan_id,
    req.body.plan_name,
    req.body.tran_amt,
    req.body.user_id,
    req.body.list_plan_valid_for_days,
    req.body.pro_plan_added_slots,
    req.body.plan_status,
    req.body.order_id,
    req.body.payment_id,
    req.body.payment_status,
    req.body.discount,
    req.body.original_price,
  ];
    db.query(q, [values], (err, data) => {
      console.log(values);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Added Successfully");
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
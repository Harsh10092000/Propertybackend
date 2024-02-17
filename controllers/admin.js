import { db } from "../connect.js";

export const fetchAll = (req, res) => {
  const q =
    "SELECT property_module.*,login_module.* from property_module LEFT JOIN login_module ON login_module.login_id = property_module.pro_user_id";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteProperty = (req, res) => {
  const q =
    "DELETE property_module.*,property_module_images.* from property_module LEFT JOIN property_module_images ON property_module_images.img_cnct_id = property_module.pro_id WHERE pro_id = ?";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};
export const fetchInterested = (req, res) => {
  const q =
    "SELECT  property_interest.*, property_module.*, login_module.* FROM property_interest LEFT JOIN login_module ON property_interest.interest_person_id = login_module.login_id left join property_module on property_interest.interest_property_id = property_module.pro_id";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

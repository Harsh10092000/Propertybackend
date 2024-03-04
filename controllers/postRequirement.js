import { db } from "../connect.js";

export const postRequirement = (req, res) => {
  const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  const q =
    "INSERT INTO post_requirement_module (data_name, data_phone, data_email , data_in_city, data_pro_type, data_pro_size, data_pro_size_unit, data_price_quo, data_desc) Values (?)";
  const values = [
    req.body.data_name,
    req.body.data_phone,
    req.body.data_email,
    req.body.data_in_city,
    req.body.data_pro_type,
    req.body.data_pro_size,
    req.body.data_pro_size_unit,
    req.body.data_price_quo,
    req.body.data_desc,
  ];
  if (
    req.body.data_name !== "" &&
    req.body.data_phone.length > 9 &&
    req.body.data_in_city !== "" &&
    req.body.data_pro_type !== "" &&
    req.body.data_pro_size !== "" &&
    req.body.data_pro_size_unit !== "" &&
    req.body.data_price_quo !== "" &&
    emailRegex.test(req.body.data_email) === true
  ) {
  db.query(q, [values], (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Added Successfully");
  });
} else {
  console.log("not validated")
}
};


export const fetchReqData = (req, res) => {
  const q = "SELECT * FROM post_requirement_module";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
import { db } from "../connect.js";

export const addProperty = (req, res) => {
  const q =
    "INSERT INTO property_module (pro_user_type, pro_ad_type, pro_type , pro_city, pro_locality, pro_plot_no, pro_street, pro_age, pro_floor, pro_bedroom, pro_washrooms, pro_balcony, pro_parking, pro_facing, pro_area_size, pro_width, pro_length, pro_facing_road_width, pro_open_sides, pro_furnishing, pro_ownership_type, pro_approval, pro_amt, pro_rental_status, pro_desc, pro_possession, pro_sub_cat, pro_user_id,pro_area_size_unit,pro_facing_road_unit,pro_amt_unit,pro_pincode) Values (?)";
  const values = [
    req.body.pro_user_type,
    req.body.pro_ad_type,
    req.body.pro_type,
    req.body.pro_city,
    req.body.pro_locality,

    req.body.pro_plot_no,
    req.body.pro_street,
    req.body.pro_age,
    req.body.pro_floor,
    req.body.pro_bedroom,

    req.body.pro_washrooms,
    req.body.pro_balcony,
    req.body.pro_parking,
    req.body.pro_facing,
    req.body.pro_area_size,

    req.body.pro_width,
    req.body.pro_length,
    req.body.pro_facing_road_width,
    req.body.pro_open_sides,
    req.body.pro_furnishing,

    req.body.pro_ownership_type,
    req.body.pro_approval,
    req.body.pro_amt,
    req.body.pro_rental_status,
    req.body.pro_desc,

    req.body.pro_possession,
    req.body.pro_sub_cat,
    req.body.pro_user_id,
    req.body.pro_area_size_unit,
    req.body.pro_facing_road_unit,

    req.body.pro_amt_unit,
    req.body.pro_pincode,
  ];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    console.log(insertId);
    return res.status(200).json(insertId);
  });
};

export const updateProperty = (req, res) => {
  const q =
    "UPDATE property_module SET pro_user_type = ?, pro_ad_type = ?, pro_type  = ?, pro_city = ?, pro_locality = ?, pro_plot_no = ?, pro_street = ?, pro_age = ?, pro_floor = ?, pro_bedroom = ?, pro_washrooms = ?, pro_balcony = ?, pro_parking = ?, pro_facing = ?, pro_area_size = ?, pro_width = ?, pro_length = ?, pro_facing_road_width = ?, pro_open_sides = ?, pro_furnishing = ?, pro_ownership_type = ?, pro_approval = ?, pro_amt = ?, pro_rental_status = ?, pro_desc = ?, pro_possession = ?, pro_sub_cat = ? , pro_user_id = ? , pro_area_size_unit = ? , pro_facing_road_unit = ? , pro_amt_unit = ?, pro_pincode = ? WHERE pro_id = ?";
  const values = [
    req.body.pro_user_type,
    req.body.pro_ad_type,
    req.body.pro_type,
    req.body.pro_city,
    req.body.pro_locality,

    req.body.pro_plot_no,
    req.body.pro_street,
    req.body.pro_age,
    req.body.pro_floor,
    req.body.pro_bedroom,
    req.body.pro_washrooms,

    req.body.pro_balcony,
    req.body.pro_parking,
    req.body.pro_facing,
    req.body.pro_area_size,
    req.body.pro_width,

    req.body.pro_length,
    req.body.pro_facing_road_width,
    req.body.pro_open_sides,
    req.body.pro_furnishing,
    req.body.pro_ownership_type,

    req.body.pro_approval,
    req.body.pro_amt,
    req.body.pro_rental_status,
    req.body.pro_desc,
    req.body.pro_possession,
    req.params.proId,
    req.body.pro_sub_cat,
    req.body.pro_user_id,
    req.body.pro_area_size_unit,
    req.body.pro_facing_road_unit,
    req.body.pro_amt_unit,
    req.body.pro_pincode,
  ];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const fetchPropertyData = (req, res) => {
  const q = "SELECT * from property_module ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyDataById = (req, res) => {
  const q = "SELECT * from property_module where pro_id = ? ";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchLatestProperty = (req, res) => {
  const q = "select * from property_module order by pro_id desc limit 3";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyDataByCat = (req, res) => {
  const q = "SELECT * FROM property_module where pro_type LIKE ?";
  db.query(q, [req.params.proType], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertySubCatNo = (req, res) => {
  const q =
    "SELECT count(pro_type) as pro_sub_cat_number , pro_type FROM property_module group by pro_sub_cat";
  db.query(q, [req.params.proType], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyDataBySubCat = (req, res) => {
  const q = "SELECT * FROM property_module where pro_sub_cat = ?";
  db.query(q, [req.params.proSubType], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyDataByUserId = (req, res) => {
  const q = "SELECT * FROM property_module where pro_user_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchShortListProperty = (req, res) => {
  const q =
    "SELECT shortlist_module.* , property_module.* FROM shortlist_module left join property_module on shortlist_module.shortlist_pro_id = property_module.pro_id where shortlist_cnct_id = ? ";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteShortlist = (req, res) => {
  const q = "delete from shortlist_module where shortlist_id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfully");
  });
};

export const deleteProperty = (req, res) => {
  const q = "delete from property_module where pro_id = ?";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfully");
  });
};

//   "pro_user_type" : "fgh",
//     "pro_ad_type" : "fgh",
//     "pro_type" : "fgh",
//     "pro_city" : "fg",
//     "pro_locality" : "hgf",

//     "pro_plot_no" : "fh",
//     "pro_street" : "gfh",
//     "pro_age" : 7,
//     "pro_floor" : 9,
//     "pro_bedroom" : 15,
//     "pro_washrooms" : 12,

//     "pro_balcony" : 9,
//     "pro_parking" : 20,
//     "pro_facing" : "south",
//     "pro_area_size" : "459",
//     "pro_width" : "45",

//     "pro_length" : "5",
//     "pro_facing_road_width" : "45",
//     "pro_open_sides" : "22",
//     "pro_furnishing" : "yes",
//     "pro_ownership_type" : "fggg",

//     "pro_approval" : "tes",
//     "pro_amt" : "56700000",
//     "pro_rental_status" : "no",
//     "pro_desc" : "test",
//     "pro_possession" : "tesy",

import { db } from "../connect.js";

export const addProperty = (req, res) => {
  const q =
    "INSERT INTO property_module (pro_user_type, pro_ad_type, pro_type , pro_city, pro_locality, pro_plot_no, pro_street, pro_age, pro_floor, pro_bedroom, pro_washrooms, pro_balcony, pro_parking, pro_facing, pro_area_size, pro_width, pro_length, pro_facing_road_width, pro_open_sides, pro_furnishing, pro_ownership_type, pro_approval, pro_amt, pro_rental_status, pro_desc, pro_possession, pro_sub_cat, pro_user_id,pro_area_size_unit,pro_facing_road_unit,pro_amt_unit,pro_pincode, pro_negotiable,pro_state, pro_sub_district, pro_date) Values (?)";
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
    req.body.pro_negotiable,
    req.body.pro_state,
    req.body.pro_sub_district,
    req.body.pro_date,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    console.log(insertId);
    return res.status(200).json(insertId);
  });
};

export const updateProperty = (req, res) => {
  const q =
    "UPDATE property_module SET pro_user_type = ?, pro_ad_type = ?, pro_type  = ?, pro_city = ?, pro_locality = ?, pro_plot_no = ?, pro_street = ?, pro_age = ?, pro_floor = ?, pro_bedroom = ?, pro_washrooms = ?, pro_balcony = ?, pro_parking = ?, pro_facing = ?, pro_area_size = ?, pro_width = ?, pro_length = ?, pro_facing_road_width = ?, pro_open_sides = ?, pro_furnishing = ?, pro_ownership_type = ?, pro_approval = ?, pro_amt = ?, pro_rental_status = ?, pro_desc = ?, pro_possession = ?, pro_area_size_unit = ? , pro_facing_road_unit = ? , pro_amt_unit = ?, pro_pincode = ? , pro_negotiable = ? , pro_state = ? , pro_sub_district = ? WHERE pro_id = ?";
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

    req.body.pro_area_size_unit,
    req.body.pro_facing_road_unit,
    req.body.pro_amt_unit,
    req.body.pro_pincode,
    req.body.pro_negotiable,
    req.body.pro_state,
    req.body.pro_sub_district,
    req.body.pro_id,
    
  ];
  db.query(q, values, (err, data) => {
    console.log(values);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};


export const addOrigin = (req, res) => {
  console.log("req.body : ", req.body);
  const q =
    "INSERT INTO user_origin_module (origin_url) Values (?)";
  const values = [
    req.body,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    req.headers.referer = 'https://propertyease.in/';
    const insertId = data.insertId;
    console.log(insertId);
    return res.status(200).json(insertId);
  });
};


export const fetchPropertyData = (req, res) => {
  const q =
    "SELECT DISTINCT property_module_images.* , property_module.* FROM property_module left join property_module_images on property_module.pro_id = property_module_images.img_cnct_id group by pro_id ORDER BY pro_id DESC";
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
  const q =
    "SELECT DISTINCT property_module_images.img_cnct_id , property_module.* , property_module_images.img_link FROM property_module left join property_module_images on property_module.pro_id = property_module_images.img_cnct_id group by pro_id ORDER BY pro_id DESC LIMIT 3";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyDataByCity = (req, res) => {
  const q =
    "SELECT DISTINCT property_module_images.* , property_module.* FROM property_module left join property_module_images on property_module.pro_id = property_module_images.img_cnct_id group by pro_id where pro_city = ? ORDER BY pro_id DESC";
  db.query(q,[req.params.city], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchLatestPropertyByCity = (req, res) => {
  const q =
    "SELECT DISTINCT property_module_images.img_cnct_id , property_module.* , property_module_images.img_link FROM property_module left join property_module_images on property_module.pro_id = property_module_images.img_cnct_id where pro_city = ? group by pro_id ORDER BY pro_id DESC LIMIT 2";
  db.query(q, [req.params.city], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchPropertyDataByCat = (req, res) => {
  const para = "%" + req.params.proType + "%";
  const q =
    "SELECT DISTINCT property_module.*,property_module_images.img_cnct_id  , property_module_images.img_link FROM property_module LEFT join property_module_images on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_type like ? group by pro_id ORDER BY pro_id DESC ";
  db.query(q, [para], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchLatestPropertyByCat = (req, res) => {
  const para = "%" + req.params.proType + "%";
  const q =
    "SELECT DISTINCT property_module.*,property_module_images.img_cnct_id  , property_module_images.img_link FROM property_module LEFT join property_module_images on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_type like ? group by pro_id ORDER BY pro_id DESC LIMIT 3 ";
  db.query(q, [para], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const fetchPropertySubCatNo = (req, res) => {
  const q =
    "SELECT count(pro_type) as pro_sub_cat_number , pro_type FROM property_module group by pro_type";
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
  const q =
    "SELECT * FROM property_module where pro_user_id = ? ORDER BY pro_id DESC";
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
  const q = "DELETE FROM shortlist_module WHERE shortlist_id = ?";
  db.query(q, [req.params.shortlistId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfully");
  });
};

export const deleteProperty = (req, res) => {
  const q =
    "DELETE property_module.* ,property_module_images.* from property_module RIGHT JOIN property_images_module on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_id = ?";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfully");
  });
};

export const fetchImagesWithId = (req, res) => {
  const q = "SELECT * from property_module_images WHERE img_cnct_id = ?";
  db.query(q, [req.params.imgId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const fetchCoverImg = (req, res) => {
  const q = "SELECT * from property";
};
export const shortlistProperty = (req, res) => {
  const q =
    "SELECT * from shortlist_module WHERE shortlist_pro_id = ? AND shortlist_cnct_id = ?";
  db.query(q, [req.body.propertyId, req.body.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(409).json("Already Shortlisted");
    const q =
      "INSERT into shortlist_module (`shortlist_pro_id` , `shortlist_cnct_id`) VALUES (?)";
    const values = [req.body.propertyId, req.body.userId];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("INSERTED SUCCESSFULLY");
    });
  });
};
export const deletePropertyImages = (req, res) => {
  const q = "delete from property_module_images where img_cnct_id = ?";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Deleted Successfully");
  });
};
export const checkShortlist = (req, res) => {
  const q =
    "SELECT * from shortlist_module WHERE shortlist_pro_id = ? AND shortlist_cnct_id = ?";
  db.query(q, [req.body.proId, req.body.cnctId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json("Done");
    return res.status(404).json("not shortlisted");
  });
};
export const checkInterested = (req, res) => {
  const q =
    "SELECT * from property_interest WHERE interest_property_id = ? AND interest_person_id = ?";
  db.query(q, [req.body.proId, req.body.cnctId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(200).json("Done");
    return res.status(404).json("Not interested");
  });
};
export const fetchCityNo = (req, res) => {
  const q =
    "SELECT count(pro_city) as pro_city_number , pro_city FROM property_module group by pro_city";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const rentalPropertyTotal = (req, res) => {
  const q =
    "SELECT count(pro_type) as pro_sub_cat_number , pro_type FROM property_module WHERE pro_ad_type = 'Rent' group by pro_type";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const rentalProperty = (req, res) => {
  const para = "%" + req.params.proType + "%";
  const q =
    "SELECT DISTINCT property_module.*,property_module_images.img_cnct_id  , property_module_images.img_link FROM property_module LEFT join property_module_images on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_type like ? AND pro_ad_type = 'Rent' group by pro_id ORDER BY pro_id DESC ";
  db.query(q, [para], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};


export const SubDistrictData = (req, res) => {
  const q =
    "SELECT district,sub_district FROM sub_district_table ORDER BY sub_district ASC ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const StateCityData = (req, res) => {
  const q =
    "SELECT distinct district , state FROM sub_district_table ORDER BY district ASC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}; 

export const SubDistrictDataByCity = (req, res) => {
  
  const city = req.params.city ;
  console.log("city : " , city )
  const q =
    "SELECT district,sub_district FROM sub_district_table where district = ? ORDER BY sub_district ASC ";
  db.query(q, [city] , (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data);
  });
};


export const StateDistinctCityData = (req, res) => {
  const q =
    "SELECT distinct district FROM sub_district_table ORDER BY district ASC";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}; 

export const fetchSuggestions = (req, res) => {
  const para = req.params.searchValue + "%";
  console.log("para : " , para )
  const q =
    "select distinct * from sub_district_table WHERE district LIKE ? ORDER BY RAND() LIMIT 10; ";
  db.query(q, [para] , (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data);
  });
};









export const fetchLatestPropertyByCat1 = (req, res) => {
  const para = "%" + req.params.proType + "%";
  const q =
    "SELECT DISTINCT property_module.*,property_module_images.img_cnct_id  , property_module_images.img_link FROM property_module LEFT join property_module_images on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_type like ? group by pro_id ORDER BY pro_id DESC LIMIT 3 ";
  db.query(q, [para], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log("data : " , data)
    return res.status(200).json(data);
  });
};



// export const fetchPropertyDataById1 = (req, res) => {
//   const q = "SELECT * from property_module where pro_id = ? ";
//   db.query(q, [req.params.proId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     console.log("data1 : " , data )
//     //const para = "%" + req.params.proType + "%";
//     const para = data[0].pro_type.split(",")[1]
//     const q =
//       "SELECT DISTINCT property_module.*,property_module_images.img_cnct_id  , property_module_images.img_link FROM property_module LEFT join property_module_images on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_type like ? group by pro_id ORDER BY pro_id DESC LIMIT 3 ";
//     db.query(q, para, (err, data1) => {
//       if (err) return res.status(500).json(err);
//       console.log("data : " , data1)
//     //   return res.status(200).json(data);
//     console.log("data1 : " , data, data1 )
//     return res.status(200).json({data, data1 });
//   });
//   });
// };

export const fetchPropertyDataById1 = (req, res) => {
  const q = "SELECT * from property_module where pro_id = ? ";
  db.query(q, [req.params.proId], (err, data) => {
    if (err) return res.status(500).json(err);
    const para = "%" + data[0].pro_type.split(",")[1] + "%"; 
    const secondQ =
      "SELECT DISTINCT property_module.*,property_module_images.img_cnct_id  , property_module_images.img_link FROM property_module LEFT join property_module_images on property_module.pro_id = property_module_images.img_cnct_id WHERE pro_type like ? group by pro_id ORDER BY pro_id DESC LIMIT 3 ";
    db.query(secondQ, [para], (err, data1) => { 
      if (err) return res.status(500).json(err);
      
      return res.status(200).json({ data, data1 });
    });
  });
};

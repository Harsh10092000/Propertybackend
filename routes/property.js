import express from "express";
import multer from "multer";
import path from "path";
import { db } from "../connect.js";
import {
  addProperty,
  fetchPropertyDataById,
  fetchPropertyData,
  updateProperty,
  fetchLatestProperty,
  fetchPropertyDataByCat,
  fetchPropertySubCatNo,
  fetchPropertyDataBySubCat,
  fetchPropertyDataByUserId,
  fetchShortListProperty,
  deleteShortlist,
  deleteProperty,
  fetchImagesWithId,
} from "../controllers/property.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/propertyImages");
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

router.post("/addPropertyimages", upload.any("files"), (req, res) => {
  console.log(req.files, req.body);
  const q =
    "INSERT INTO property_module_images (`img_link`,`img_cnct_id`, `img_user_id`) VALUES ?";
  const values = req.files.map((item) => [
    item.filename,
    req.body.proId,
    req.body.userId,
  ]);
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("INSERTED SUCCESSFULLY");
  });
});

router.post("/addProperty", addProperty);
router.put("/updateProperty/:proId", updateProperty);
router.get("/fetchPropertyData", fetchPropertyData);
router.get("/fetchPropertyDataById/:proId", fetchPropertyDataById);
router.get("/fetchLatestProperty", fetchLatestProperty);
router.get("/fetchPropertyDataByCat/:proType", fetchPropertyDataByCat);
router.get("/fetchPropertySubCatNo", fetchPropertySubCatNo);
router.get("/fetchPropertyDataBySubCat/:proSubType", fetchPropertyDataBySubCat);
router.get("/fetchPropertyDataByUserId/:userId", fetchPropertyDataByUserId);
router.get("/fetchShortListProperty/:userId", fetchShortListProperty);
router.get("/fetchImagesWithId/:imgId", fetchImagesWithId);
router.delete("/deleteShortlist/:shortlistId", deleteShortlist);
router.delete("/deleteProperty/:proId", deleteProperty);

export default router;

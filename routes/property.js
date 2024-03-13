import express from "express";
import multer from "multer";
import fs from "fs";
import sharp from "sharp";
import { db } from "../connect.js";
import sizeOf from "image-size";
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
  deletePropertyImages,
  shortlistProperty,
  checkShortlist,
  checkInterested,
  fetchCityNo,
  rentalPropertyTotal,
  rentalProperty,
  SubDistrictData,
  StateCityData,
} from "../controllers/property.js";
const router = express.Router();

let fileArr = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/propertyImages");
  },
  filename: (req, file, cb) => {
    let tempName = Date.now() + "-" + file.originalname;
    fileArr.push(tempName);
    cb(null, tempName);
  },
});

const upload = multer({
  storage,
});

const setWatermark = async (inputPath, outputPath) => {
  console.log(inputPath)
  try {
    await sharp(inputPath)
      .resize({ width: 1000 })
      .composite([
        {
          input: "public/propertyImages/logo_2.png",
          gravity: "southeast",
        },
      ])
      .toFile(outputPath);
  } catch (err) {
    console.error("Error adding watermark:", err);
  }
};

const setWatermarkSmallerSize = async (inputPath, outputPath) => {
  try {
    sharp(inputPath)
      .resize({ width: 1000 })
      .composite([
        {
          input: "public/propertyImages/logo_2.png",
          gravity: "southeast",
        },
      ])
      .toFile(outputPath);
  } catch (err) {
    console.error("Error adding watermark:", err);
  }
};

const deleteOP = (singleFile) => {
  fs.unlinkSync("public/propertyImages/" + singleFile, (err) => {
    if (err) console.log("delete me yeah error h ", err);
    else console.log("Deleted hui hui ", singleFile);
  });
};

router.post("/addPropertyimages", upload.any("files"), (req, res) => {
  console.log("yha h");
  console.log(fileArr);
  fileArr.forEach(async (singleFile) => {
    const name = singleFile;
    console.log(name);
    const inputPath = `public/propertyImages//${name}`;
    const path = `public/propertyImages/watermark/${name}`;
    console.log("yha h");
    //setWatermark(inputPath, path);
    sizeOf(inputPath, async (err, dim) => {
      if (dim.height < 120 || dim.width < 320) {
        await setWatermarkSmallerSize(inputPath, path);
      } else {
        await setWatermark(inputPath, path);
      }
    });
    //setTimeout(() => { deleteOP(singleFile) }, 8000);
  });

  //fileArr = [];

  const q =
    "INSERT INTO property_module_images (`img_link`,`img_cnct_id`, `img_user_id`) VALUES ?";
  const values = fileArr.map((item) => [item, req.body.proId, req.body.userId]);
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    fileArr = [];
    return res.status(200).json("INSERTED SUCCESSFULLY");
  });
});

router.post("/addProperty", addProperty);
router.put("/updateProperty", updateProperty);
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
router.delete("/deletePropertyImages/:proId", deletePropertyImages);
router.post("/shortlistProperty", shortlistProperty);
router.post("/checkShortlist", checkShortlist);
router.post("/checkInterested", checkInterested);
router.get("/fetchCityNo", fetchCityNo);
router.get("/rentalPropertyTotal", rentalPropertyTotal);
router.get("/rentalProperty/:proType", rentalProperty);
router.get("/SubDistrictData", SubDistrictData);
router.get("/StateCityData", StateCityData);
export default router;

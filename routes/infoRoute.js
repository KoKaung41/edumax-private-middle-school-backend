const express = require("express");
const multer = require("multer");
const infoController = require("../controllers/infoController");
const router = express.Router();

//Multer configuration for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

//routes
router.post("/create", upload.single("img"), infoController.createInfo);
router.get("/", infoController.getAllInfo);
router.get("/:id", infoController.getInfoById);
router.put("/update/:id", upload.single("img"), infoController.updateInfo);
router.delete("/delete/:id", infoController.deleteInfo);
module.exports = router;

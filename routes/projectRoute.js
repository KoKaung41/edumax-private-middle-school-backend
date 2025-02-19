const express = require("express");
const multer = require("multer");
const projectController = require("../controllers/projectController");
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
router.post("/create", upload.single("img"), projectController.createProject);
router.get("/", projectController.getAllProject);
router.get("/:id", projectController.getProjectById);
router.put(
  "/update/:id",
  upload.single("img"),
  projectController.updateProject
);
router.delete("/delete/:id", projectController.deleteProject);
module.exports = router;

const Project = require("../models/Project");
const sharp = require("sharp");
//Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
    let img = null;
    if (req.file) {
      const webpBuffer = await sharp(req.file.buffer).webp().toBuffer();
      img = webpBuffer.toString("base64");
    }
    const project = new Project({
      title,
      subTitle,
      description,
      img,
    });

    await project.save();
    res.status(201).json({ message: "Successfully Uploaded..", project });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Get all project

exports.getAllProject = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 7;

    const project = await Project.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalProject = await Project.countDocuments();
    const totalPages = Math.ceil(totalProject / limit);

    res.status(200).json({
      message: "Get all projects.",
      project,
      currentPage: page,
      totalProject,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Get a single project by ID

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ message: "Project not found." });
    res.status(200).json({ message: "Project found!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
    const updateData = {
      title,
      subTitle,
      description,
    };
    if (req.file) {
      updateData.img = req.file.buffer.toString("base64");
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      timestamps: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({
      message: "Project is updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({
      message: "Project deleted successsfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

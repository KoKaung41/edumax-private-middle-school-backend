const Info = require("../models/Info");
const sharp = require("sharp");

//Create new info

exports.createInfo = async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
    let img = null;
    if (req.file) {
      const webpBuffer = await sharp(req.file.buffer).webp().toBuffer();
      img = webpBuffer.toString("base64");
    }
    const info = new Info({
      title,
      subTitle,
      description,
      img,
    });

    await info.save();
    res.status(201).json({ message: "Successfully Uploaded.", info });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

//Get all info

exports.getAllInfo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 7;

    const info = await Info.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalInfo = await Info.countDocuments();
    const totalPages = Math.ceil(totalInfo / limit);

    res.status(200).json({
      message: "Get all infos.",
      info,
      currentPage: page,
      totalInfo,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get a single info by ID

exports.getInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await Info.findById(id);
    if (!info) return res.status(404).json({ message: "Info not found." });
    res.status(200).json({ message: "Info found!", info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update a info by ID
exports.updateInfo = async (req, res) => {
  try {
    const { title, subTitle, description } = req.body;
    const updateData = {
      title,
      subTitle,
      description,
      createdAt: new Date(),
    };
    if (req.file) {
      updateData.img = req.file.buffer.toString("base64");
    }
    const info = await Info.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!info) return res.status(404).json({ message: "Info not found" });
    res.status(200).json({
      message: "Info is updated successfully",
      info,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete info
exports.deleteInfo = async (req, res) => {
  try {
    const info = await Info.findByIdAndDelete(req.params.id);
    if (!info) return res.status(404).json({ message: "Info not found" });
    res.status(200).json({
      message: "Info deleted successsfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

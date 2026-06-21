const Manpower = require("../models/manpowerModel");

exports.getAll = async (req, res) => {
  try {
    const data = await Manpower.getAll();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getByBarcode = async (req, res) => {
  try {
    const barcode = req.params.barcode;

    const data = await Manpower.getByBarcode(barcode);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Barcode tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const result = await Manpower.create(req.body);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

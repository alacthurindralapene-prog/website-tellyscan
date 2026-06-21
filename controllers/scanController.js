const db = require("../config/database");

exports.scan = async (req, res) => {
  const { barcode, waktu } = req.body;

  await db.query("INSERT INTO scan_log(barcode,waktu_scan) VALUES(?,?)", [
    barcode,
    waktu,
  ]);

  res.json({
    success: true,
  });
};

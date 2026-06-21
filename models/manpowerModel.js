const db = require("../config/db");

const Manpower = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM manpower ORDER BY nama ASC");
    return rows;
  },

  getByBarcode: async (barcode) => {
    const [rows] = await db.query("SELECT * FROM manpower WHERE barcode = ?", [
      barcode,
    ]);

    return rows[0];
  },

  create: async (data) => {
    const { barcode, nama, unit } = data;

    const [result] = await db.query(
      `INSERT INTO manpower
      (barcode,nama,unit)
      VALUES (?,?,?)`,
      [barcode, nama, unit],
    );

    return result;
  },
};

module.exports = Manpower;

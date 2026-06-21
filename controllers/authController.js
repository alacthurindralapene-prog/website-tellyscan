const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { pin } = req.body;

  if (pin === "0000") {
    const token = jwt.sign(
      {
        role: "supervisor",
      },
      "TELLY_SECRET",
    );

    return res.json({
      success: true,
      token,
    });
  }

  res.status(401).json({
    success: false,
    message: "PIN salah",
  });
};

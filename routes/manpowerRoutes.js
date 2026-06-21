const express = require("express");
const router = express.Router();

const manpowerController = require(
  "../controllers/manpowerController"
);

router.get("/", manpowerController.getAll);

router.get(
  "/barcode/:barcode",
  manpowerController.getByBarcode
);

router.post("/", manpowerController.create);

module.exports = router;
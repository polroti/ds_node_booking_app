const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Enter NIC",
  });
});

router.get("/:nic", (req, res, next) => {
  const nic = req.params.nic;
  const value = nic.split("");
  const check = value[0];
  if (check === "8" || check === "7") {
    res.status(200).json({
      message: "eligible for discounts",
    });
  } else {
    res.status(200).json({
      message: "not eligible",
    });
  }
});

module.exports = router;

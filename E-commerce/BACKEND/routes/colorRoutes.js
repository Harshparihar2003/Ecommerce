const express = require("express");
const { createColor, updateColor, deleteColor, getColor, getAllColor } = require("../controller/colorController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin ,createColor);
router.put("/:id", authMiddleware, isAdmin ,updateColor);
router.delete("/:id", authMiddleware, isAdmin ,deleteColor);
router.get("/:id", authMiddleware, isAdmin ,getColor);
router.get("/getColor", authMiddleware, isAdmin , getAllColor);

module.exports = router;
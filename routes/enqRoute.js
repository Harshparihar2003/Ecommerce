const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry } = require("../controller/enqController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.put("/:id", authMiddleware, isAdmin ,updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin ,deleteEnquiry);
router.get("/:id", authMiddleware, isAdmin ,getEnquiry);
router.get("/getEnquiry", authMiddleware, isAdmin , getAllEnquiry);

module.exports = router;
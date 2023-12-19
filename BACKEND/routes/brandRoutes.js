const express = require("express");
const { createModel, updateModel, deleteModel, getModel, getAllModel } = require("../controller/brandController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin ,createModel);
router.put("/:id", authMiddleware, isAdmin ,updateModel);
router.delete("/:id", authMiddleware, isAdmin ,deleteModel);
router.get("/:id", authMiddleware, isAdmin ,getModel);
router.get("/getModel", authMiddleware, isAdmin , getAllModel);

module.exports = router;
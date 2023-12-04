const express = require("express");
const router = express.Router();
const {createUser , loginUserCtrl, getAllUser, getAUser, deleteAUser, updateUser, blockUser, unblockUser} = require("../controller/userController");
const {authMiddleware, isAdmin} = require("../middleware/authmiddleware");


router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/getuser", getAllUser);
router.get("/:id",authMiddleware, getAUser)
router.delete("/:id", deleteAUser)
router.put("/:id",authMiddleware, updateUser)
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser)
module.exports = router;
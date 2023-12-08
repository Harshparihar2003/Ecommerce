const express = require("express");
const router = express.Router();
const {createUser , loginUserCtrl, getAllUser, getAUser, deleteAUser, updateUser, blockUser, unblockUser, handleRefershToken, logOut, updatePassword, forgotPasswordToken, resetPassword} = require("../controller/userController");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");


router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)

router.put("/password",authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.get("/getuser", getAllUser);
router.get("/refresh",handleRefershToken)
router.get("/logout",logOut)

router.get("/:id",authMiddleware, getAUser)
router.delete("/:id", deleteAUser)
router.put("/:id",authMiddleware, updateUser)
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser)
module.exports = router;
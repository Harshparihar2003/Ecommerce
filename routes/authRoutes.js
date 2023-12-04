const express = require("express");
const router = express.Router();
const {createUser , loginUserCtrl, getAllUser, getAUser, deleteAUser, updateUser} = require("../controller/userController")


router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/getuser", getAllUser);
router.get("/:id", getAUser)
router.delete("/:id", deleteAUser)
router.put("/:id", updateUser)
module.exports = router;
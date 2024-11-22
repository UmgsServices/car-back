const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyUser,
  getUser,
  logOutUser,
  handdleRefresh,
  acceptUser,
  handdleRole,
  revokeUser,
} = require(`../controller/user/userController`);
const verifyJWT = require("../middleware/verifyJwt");
const verifyRole = require("../middleware/verifyRole");
router.route(`/register`).post(registerUser);
router.route(`/auth`).post(verifyUser).get(verifyJWT, getUser);
router.route(`/logout`).get(logOutUser);
router.route(`/refresh`).get(handdleRefresh);
router.route(`/accept`).post(verifyJWT, verifyRole(2), acceptUser);
router.route(`/role`).post(verifyJWT, verifyRole(3), handdleRole);
router.route(`/revoke`).post(verifyJWT, verifyRole(3), revokeUser);
module.exports = router;

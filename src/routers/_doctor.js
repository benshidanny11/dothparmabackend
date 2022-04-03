import Validator from "../middleware/_validator";
import express from "express";
import Auth from "../middleware/Auth";
import AccessLevel from "../middleware/user";
import DoctorController from "../controllers/DoctorController";

const router = express.Router();

router.post(
  "/createnew",
  Validator("doctor"),
  Auth.verifyToken,
  AccessLevel[0],
  DoctorController.createNew
);

router.put(
  "/updatedoctor/:did",
  Validator("doctor"),
  Auth.verifyToken,
  AccessLevel[0],
  DoctorController.updateDoctor
);

router.get(
  "/findall",
  DoctorController.findAll
);
router.delete(
  "/deletedoctor/:did",
  Auth.verifyToken,
  AccessLevel[0],
  DoctorController.deleteDoctor
);


export default router;
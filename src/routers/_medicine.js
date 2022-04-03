import Validator from "../middleware/_validator";
import express from "express";
import Auth from "../middleware/Auth";
import AccessLevel from "../middleware/user";
import MedicineController from "../controllers/MedicineController";


const router = express.Router();

router.post(
  "/createnew",
  Validator("medicine"),
  Auth.verifyToken,
  AccessLevel[0],
  MedicineController.createMedicine
);

router.put(
    "/updatemedicine/:mid",
    Validator("medicine"),
    Auth.verifyToken,
    AccessLevel[0],
    MedicineController.updateMedicine
  );
  router.get(
    "/getallmedicines",
    MedicineController.findAll
  );

  router.delete(
    "/deletemedicine/:mid",
    Auth.verifyToken,
    AccessLevel[0],
    MedicineController.deleteMedicine
  );

  router.get(
    "/medicinesinpharmacy/:phid",
    MedicineController.getMedsInPharma
  );


export default router;
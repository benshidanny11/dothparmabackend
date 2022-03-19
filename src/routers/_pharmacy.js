import Pharmacy from "../controllers/Pharmacy";
import Validator from "../middleware/_validator";
import express from "express";
import Auth from "../middleware/Auth";
import AccessLevel from "../middleware/user";

const router = express.Router();

router.post(
  "/createnew",
  Validator("pharmacy"),
  Auth.verifyToken,
  AccessLevel[0],
  Pharmacy.CreatePharmacy
);
router.put(
  "/updatepharmacy/:phid",
  Validator("pharmacy"),
  Auth.verifyToken,
  AccessLevel[0],
  Pharmacy.updatePharmacy
);
router.delete(
  "/deletepharmacy/:pid",
  Auth.verifyToken,
  AccessLevel[0],
  Pharmacy.deletePharmacy
);
router.get("/findall", Pharmacy.findAll);

export default router;

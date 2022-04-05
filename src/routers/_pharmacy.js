import Pharmacy from '../controllers/PharmacyController';
import Validator from '../middleware/_validator';
import express from 'express';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import DataExistsChecks from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createnew',
  Validator('pharmacy'),
  Auth.verifyToken,
  AccessLevel[0],
  Pharmacy.CreatePharmacy
);
router.put(
  '/updatepharmacy/:phid',
  Validator('pharmacy'),
  Auth.verifyToken,
  AccessLevel[0],
  Pharmacy.updatePharmacy
);
router.delete(
  '/deletepharmacy/:pid',
  Auth.verifyToken,
  AccessLevel[0],
  Pharmacy.deletePharmacy
);
router.get('/findall', Pharmacy.findAll);
router.post(
  '/addmedtopharma',
  Auth.verifyToken,
  AccessLevel[0],
  DataExistsChecks[0],
  DataExistsChecks[1],
  Pharmacy.addMedicineToPharma
);

export default router;

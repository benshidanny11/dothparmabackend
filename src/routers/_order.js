import express from 'express';
import Validator from '../middleware/_validator';
import OrderController from '../controllers/OrderController';
import DataExistsChecks from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createorder',
  Validator('patient'),
  DataExistsChecks[0],
  DataExistsChecks[1],
  OrderController.createNewOrder
);

export default router;

/* eslint-disable no-unused-vars */
import db from '../connection/_query';
import {
  approveOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getApprovedOrders,
  getRejectedOrders,
  rejectOrder,
  updateOrder,
} from '../queries/orders';
import { createPatient, getByEmail } from '../queries/patient';
import { getOneById } from '../queries/pharmacy';
import { STATUSES } from '../../constants/ResponseStatuses';
import { MESSAGES } from '../../constants/ResponceMessages';
import { createOrder as orderHandler } from '../../utils/appUtils';

const Order = {
  findAll: async () => {

  },
  create: async (dataPatient, dataOrder) => {
    try {
      let patientRes = await db.query(getByEmail, [dataPatient[2]]);
      if (patientRes.rows.length > 0) {
        return await orderHandler(patientRes, dataOrder, db, createOrder, getOneById);
      }
      patientRes = await db.query(createPatient, dataPatient);
      if (patientRes.rows.length > 0) {
        return await orderHandler(patientRes, dataOrder, db, createOrder, getOneById);
      }
      return {
        status: STATUSES.BAD_REQUEST,
        message: `Order ${MESSAGES.NOT_CREATED}`,
        data: [],
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  },
  update: async () => {

  },
  destroy: async () => {

  },
};

export default Order;

import db from "../database/connection/query";
import {
  approveOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getApprovedOrders,
  getRejectedOrders,
  rejectOrder,
  updateOrder,
} from "../database/queries/orders";
import { createPatient, getByEmail } from "../database/queries/patient";
import { getOneById } from "../database/queries/pharmacy";
import { STATUSES } from "../constants/ResponseStatuses";
import { MESSAGES } from "../constants/ResponceMessages";
import { createOrder as orderHandler } from "../utils/appUtils";

class Order {
  async createOrder(dataPatient, dataOrder) {
    try {
      let patientRes = await db.query(getByEmail, [dataPatient[2]]);
      if (patientRes.rows.length > 0) {
        return await orderHandler(patientRes, dataOrder, db,createOrder,getOneById);
      } else {
        patientRes = await db.query(createPatient, dataPatient);
        if (patientRes.rows.length > 0) {
          return await orderHandler(patientRes, dataOrder, db,createOrder,getOneById);
        } else {
          return {
            status: STATUSES.BAD_REQUEST,
            message: `Order ${MESSAGES.NOT_CREATED}`,
            data: [],
          };
        }
      }
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }
}

export default new Order();

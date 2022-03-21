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

class Order {
  async createOrder(dataPatient, dataOrder) {
    try {
      let patientRes = await db.query(getByEmail, [dataPatient[2]]);
      if (patientRes.rows.length > 0) {
        const mDataOrder = [
          ...dataOrder.slice(0, 1),
          patientRes.rows[0].p_id,
          ...dataOrder.slice(1),
        ];
        const orderRes = await db.query(createOrder, mDataOrder);
        if (orderRes.rows.length > 0) {
          let pharmaRes = await db.query(getOneById, [
            orderRes.rows[0].o_pharmacy,
          ]);
          const resData = patientRes.rows[0];
          resData.order = orderRes.rows[0];
          resData.pharmacyEmail = pharmaRes.rows[0].ph_email;
          return {
            status: STATUSES.CREATED,
            message: `Order ${MESSAGES.CREATED}`,
            data: resData,
          };
        } else {
          return {
            status: STATUSES.BAD_REQUEST,
            message: `Order ${MESSAGES.NOT_CREATED}`,
            data: [],
          };
        }
      } else {
        patientRes = await db.query(createPatient, dataPatient);
        if (patientRes.rows.length > 0) {
          const mDataOrder = [
            ...dataOrder.slice(0, 1),
            patientRes.rows[0].p_id,
            ...dataOrder.slice(1),
          ];
          const orderRes = db.query(createOrder, mDataOrder);
          if (orderRes.rows.length > 0) {
            let pharmaRes = await db.query(getOneById, [
              orderRes.rows[0].o_pharmacy,
            ]);
            const resData = patientRes.rows[0];
            resData.order = orderRes.rows[0];
            resData.pharmacyEmail = pharmaRes.rows[0].ph_email;
            return {
              status: STATUSES.CREATED,
              message: `Order ${MESSAGES.CREATED}`,
              data: resData,
            };
          } else {
            return {
              status: STATUSES.BAD_REQUEST,
              message: `Order ${MESSAGES.NOT_CREATED}`,
              data: [],
            };
          }
        } else {
          return {
            status: STATUSES.BAD_REQUEST,
            message: `Order ${MESSAGES.NOT_CREATED}`,
            data: [],
          };
        }
      }
    } catch (error) {
      //  console.log(error)
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }
}

export default new Order();

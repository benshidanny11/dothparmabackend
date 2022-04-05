/* eslint-disable require-jsdoc */
import db from '../database/connection/query';
import {createAppointment} from '../database/queries/appointment';
import {STATUSES} from '../constants/ResponseStatuses';
import {MESSAGES} from '../constants/ResponceMessages';

const Appointment = {
  create: async (data) => {
    try {
      const createRes = await db.query(createAppointment, data);
      if (createRes.rows.length>0) {
        return {
          status: STATUSES.CREATED,
          message: `Appointment ${MESSAGES.CREATED}`,
          data: createRes.rows[0],
        };
      } else {
        return {
          status: STATUSES.BAD_REQUEST,
          message: `Appointment ${MESSAGES.NOT_CREATED}`,
          data: [],
        };
      }
    } catch (e) {
      return {
        status: STATUSES.SERVERERROR,
        message: `Error: ${e.message}`,
      };
    }
  },
  update: async () => {

  },
  destroy: async () => {

  },
};

export default Appointment;



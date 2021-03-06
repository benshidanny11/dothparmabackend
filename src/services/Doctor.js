import { MESSAGES } from "../constants/ResponceMessages";
import { STATUSES } from "../constants/ResponseStatuses";
import query from "../database/connection/query";
import {
  createDoctor,
  deleteDoctor,
  desactivateDoctor,
  getAllDoctors,
  getByEmailOrPhone,
  updateDoctor,
} from "../database/queries/doctor";
class Doctor {
  async createNew(data) {
    try {
      let doctorRes = await query.query(getByEmailOrPhone, [data[2], data[3]]);
      if (doctorRes.rows.length > 0) {
        return {
          status: STATUSES.BAD_REQUEST,
          message: MESSAGES.ALREDY_EXISTS,
        };
      } else {
        doctorRes = await query.query(createDoctor, data);
        if (doctorRes.rows.length > 0) {
          return {
            status: STATUSES.CREATED,
            message: `Doctor ${MESSAGES.CREATED}`,
            data: doctorRes.rows[0],
          };
        } else {
          return {
            status: STATUSES.BAD_REQUEST,
            message: MESSAGES.NOT_CREATED,
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
  async updateDoctor(data) {
    try {
      //
      const doctorRes = await query.query(updateDoctor, data);
      if (doctorRes.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: `Doctor ${MESSAGES.UPDATED}`,
          data: doctorRes.rows[0],
        };
      } else {
        return {
          status: STATUSES.BAD_REQUEST,
          message: MESSAGES.NOT_FOUND,
        };
      }
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }
  async getAll() {
    try {
      const doctors = await query.query(getAllDoctors);
      if (doctors.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.FOUND,
          data: doctors.rows,
        };
      } else {
        return {
          status: STATUSES.NO_CONTENT,
          message: MESSAGES.NOT_CONTENT,
          data: doctors.rows,
        };
      }
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }

  async deleteDoctor(did){
    try {
      const deletedRes=await query.query(deleteDoctor,[did]);
      if(deletedRes.rows.length>0){
        return {
          status:STATUSES.OK,
          message:MESSAGES.DELETED,
        }
      }else {
        return {
          status:STATUSES.BAD_REQUEST,
          message:MESSAGES.NOT_FOUND,
        }
      }
    }catch(error){
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }
}

export default new Doctor();

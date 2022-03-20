import query from "../database/connection/query";
import { createMedicine, updateMedicine ,findAllMedicines,searchByName,getById,deleteMedicine} from "../database/queries/medicine";
import { STATUSES } from "../constants/ResponseStatuses";
import { MESSAGES } from "../constants/ResponceMessages";
class Medicine {
  async createNew(data) {
    try {
      const createdMedicine = await query.query(createMedicine, data);
      if (createdMedicine.rows.length > 0) {
        return {
          status: STATUSES.CREATED,
          message: `Medicine ${MESSAGES.CREATED}`,
          data: createdMedicine.rows[0],
        };
      } else {
        return {
          status: STATUSES.BAD_REQUEST,
          message: `Medicine ${MESSAGES.NOT_CREATED}`,
          data: {},
        };
      }
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }
  async updateMedicine(data) {
    try {
      const createdMedicine = await query.query(updateMedicine, data);
      if (createdMedicine.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: `Medicine ${MESSAGES.UPDATED}`,
          data: createdMedicine.rows[0],
        };
      } else {
        return {
          status: STATUSES.BAD_REQUEST,
          message: `Medicine ${MESSAGES.NOT_FOUND}`,
          data: {},
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
      const medicines = await query.query(findAllMedicines);
      if (medicines.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.FOUND,
          data: medicines.rows,
        };
      } else {
        return {
          status: STATUSES.NO_CONTENT,
          message: MESSAGES.NOT_CONTENT,
          data: [],
        };
      }
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }

  async deleteMedicine(mid){
    try {
      const deletedRes=await query.query(deleteMedicine,[mid]);
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

export default new Medicine();

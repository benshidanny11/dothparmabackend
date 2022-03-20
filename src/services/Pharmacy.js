import { createPharmacy, deletePharmacy, disactivatePharmacy, getAllPharmacies, updatePharmacy, getOneById, searchByName, getByEmailOrPhone ,addMedicineToPharmacy} from '../database/queries/pharmacy';
import query from '../database/connection/query';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
class Pharmacy {

    async createNew(data) {

        try {
            const pharmacy = await query.query(getByEmailOrPhone, [data[2], data[3]]);
            if (pharmacy.rows[0]) {
                return {
                    status: 400,
                    message: MESSAGES.ALREDY_EXISTS
                }
            } else {
                try{
                    const createdPharmacy = await query.query(createPharmacy, data);
                    if (createdPharmacy.rows.length > 0) {
                        return {
                            status: STATUSES.CREATED,
                            message: `Pharmacy ${MESSAGES.CREATED}`,
                            data: createdPharmacy.rows,
                        }
                    } else {
                        console.log("Hello check 2");
                        return {
                            status: STATUSES.BAD_REQUEST,
                            message: MESSAGES.UNKNOWN_ERROR,
                        }
                    }
                }catch(error){
                    console.log("Hello check 4",error);
                    return {
                        status: STATUSES.BAD_REQUEST,
                        message: MESSAGES.UNKNOWN_ERROR,
                    }
                }
               
            }
        } catch(error) {
            console.log("Hello check 3",error);
            return {
                status: 400,
                message: MESSAGES.UNKNOWN_ERROR,
            }
        }


    }
    async findAllPharmacies(){
        try{
            const pharmacies=  await query.query(getAllPharmacies);
            if(pharmacies.rows.length>0){
                return {
                    status:STATUSES.OK,
                    message:MESSAGES.FOUND,
                    data:pharmacies.rows
                }
            }else {
                return {
                    status:STATUSES.NO_CONTENT,
                    message:MESSAGES.NOT_CONTENT,
                    data:pharmacies.rows
                } 
            }
        }catch(error){
            return {
                status:STATUSES.SERVERERROR,
                message:error.message,
            } 
        }
    }

    async updatePharmacy(data){
        try{
            const pharmacies=  await query.query(updatePharmacy,data);
            if(pharmacies.rows.length>0){
                return {
                    status:STATUSES.OK,
                    message:MESSAGES.UPDATED,
                    data:pharmacies.rows[0]
                }
            }else {
                return {
                    status:STATUSES.BAD_REQUEST,
                    message:MESSAGES.UNKNOWN_ERROR,
                } 
            }
        }catch(error){
            return {
                status:STATUSES.SERVERERROR,
                message:error.message,
            } 
        }
    }
    async deletePharmacy(pid){
        try{
            const pharmacies=  await query.query(deletePharmacy,[pid]);
            if(pharmacies.rows.length>0){
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
                status:STATUSES.SERVERERROR,
                message:error.message,
            } 
        }
    }

    async addMedicineInPharmacy(data){
        try{
         const pharmacyMedicine=await query.query(addMedicineToPharmacy,data);
         if(pharmacyMedicine.rows.length>0){
          return {
              status:STATUSES.CREATED,
              message:'Medicine added to pharmacy successfully!',
          }
         }else{
           return {
            status:STATUSES.BAD_REQUEST,
            message:'Medicine not added to pharmacy!',
           }  
         }
        }catch(error){
            return {
                status:STATUSES.SERVERERROR,
                message:error.message,
            }
        } 
    }
}
export default new Pharmacy();
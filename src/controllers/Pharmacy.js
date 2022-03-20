import moment from "moment";
import { v4 as uuid } from "uuid";
import { MESSAGES } from "../constants/ResponceMessages";
import { STATUSES } from "../constants/ResponseStatuses";
import Pharmacy from "../services/Pharmacy";
class PharmacyController {
  async CreatePharmacy(req, res) {
    //ph_id,ph_name,ph_email,ph_phone,ph_website,ph_address,ph_status,done_on,user_id

    const payload = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.website,
      req.body.address,
      "1",
      moment(new Date()),
      req.user.u_id,
    ];
    Pharmacy.createNew(payload)
      .then((response) => {
        if (response.status === STATUSES.CREATED) {
          res.status(STATUSES.CREATED).send({
            status: STATUSES.CREATED,
            message: response.message,
            data: response.data,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
          });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }

  async updatePharmacy(req, res) {
   
    const payload = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.website,
      req.body.address,
      moment(new Date()),
      req.user.u_id,
      req.params.phid,
    ];
    Pharmacy.updatePharmacy(payload)
      .then((response) => {
        if (response.status === STATUSES.OK) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            data: response.data,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
          });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }
  async deletePharmacy(req, res) {
    Pharmacy.deletePharmacy(req.params.pid)
      .then((response) => {
        if (response.status === STATUSES.OK) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
          });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }
  
  async findAll(req,res) {
    Pharmacy.findAllPharmacies()
      .then((response) => {
        if (response.status === STATUSES.OK) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            data: response.data,
          });
        }else {
            res.status(STATUSES.NO_CONTENT).send({
                status: STATUSES.NO_CONTENT,
                message: response.message,
                data: response.data,
              });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }
  async addMedicineToPharma(req,res){
    Pharmacy.addMedicineInPharmacy([req.body.phid,req.body.mid]).then((response)=>{
     res.status(response.status).send({
       status:response.status,
       message:response.message,
     });
    }).catch((error)=>{
      res.status(STATUSES.SERVERERROR).send({
        status:STATUSES.SERVERERROR,
        message:error.message,
      });
    });
  }
}

export default new PharmacyController();

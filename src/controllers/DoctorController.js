import Doctor from "../services/Doctor";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { STATUSES } from "../constants/ResponseStatuses";
class DoctorController {
  async createNew(req, res) {
    //d_id,d_name,d_email,d_phone,d_speciality,d_clinic,d_image,d_status,d_doneon,user_id
    const data = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.speciality,
      req.body.clinic,
      req.body.image,
      '1',
      moment(new Date()),
      req.user.u_id,
    ];
    Doctor.createNew(data).then((response)=>{
        res.status(response.status).send(
            {
            status:response.status,
            message:response.message,
            data:response.data
            }
        );
    }).catch((error)=>{
        res.status(STATUSES.SERVERERROR).send(
            {
            status:STATUSES.SERVERERROR,
            message:error.message,
            data:null
            }
        );
    });
  }
  async updateDoctor(req,res){
    //d_name=$1,d_email=$2,d_speciality=$3,d_clinic=$4,d_image=$5,d_doneon=$6,user_id=$7,d_phone=$8 WHERE do_id=$9
    const data = [
      req.body.name,
      req.body.email,
      req.body.speciality,
      req.body.clinic,
      req.body.image,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      req.user.u_id,
      req.body.phone,
      req.params.did
    ];
    Doctor.updateDoctor(data).then((response)=>{
      res.status(response.status).send(
          {
          status:response.status,
          message:response.message,
          data:response.data
          }
      );
  }).catch((error)=>{
      res.status(STATUSES.SERVERERROR).send(
          {
          status:STATUSES.SERVERERROR,
          message:error.message,
          data:null
          }
      );
  });
  }

  async findAll(req,res){
    Doctor.getAll().then((response)=>{
     res.status(response.status).send({
       status:response.status,
       message:response.message,
       data:response.data
     })
    }).catch((error)=>{
      res.status(STATUSES.SERVERERROR).send(
        {
        status:STATUSES.SERVERERROR,
        message:error.message,
        data:null
        }
    );
    });
  }

  async deleteDoctor(req,res){
    Doctor.deleteDoctor(req.params.did).then((response)=>{
      res.status(response.status).send(
          {
          status:response.status,
          message:response.message,
          data:response.data
          }
      );
  }).catch((error)=>{
      res.status(STATUSES.SERVERERROR).send(
          {
          status:STATUSES.SERVERERROR,
          message:error.message,
          data:null
          }
      );
  });
  }
}

export default new DoctorController();

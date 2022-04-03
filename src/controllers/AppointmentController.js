import Appointment from "../services/Appointment";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { STATUSES } from "../constants/ResponseStatuses";

class AppointmentController {
  async createAppointment(req, res) {
    //a_id,patient_id,doctor_id,a_desease,a_date,a_status
    const data = [
      uuid(),
      req.body.patid,
      req.body.docid,
      req.body.deasese,
      moment(new Date()),
      "pending",
    ];
    const createRes = await Appointment.createAppointment(data);
    res.status(createRes.status).send({
      status: createRes.status,
      message: createRes.message,
      data: createRes.data,
    });
  }
}

export default new AppointmentController();

import Medicine from "../services/Medicine";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { STATUSES } from "../constants/ResponseStatuses";

class MedicineController {
  async createMedicine(req, res) {
    const data = [
      uuid(),
      req.body.name,
      req.body.properties,
      req.body.description,
      req.body.image,
      req.body.price,
      "1",
      req.body.type,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      req.user.u_id,
    ];
    Medicine.createNew(data)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }
  async updateMedicine(req, res) {
    const data = [
      req.body.name,
      req.body.properties,
      req.body.description,
      req.body.image,
      req.body.price,
      req.body.type,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      req.user.u_id,
      req.params.mid,
    ];
    Medicine.updateMedicine(data)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }
  async findAll(req, res) {
    Medicine.getAll()
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  }

  async deleteMedicine(req, res) {
    Medicine.deleteMedicine(req.params.mid)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        });
      });
  }
}
export default new MedicineController();

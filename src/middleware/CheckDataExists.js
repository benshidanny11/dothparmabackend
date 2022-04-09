import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import db from '../database/connection/_query';
import { getOneById } from '../database/queries/pharmacy';
import { getById } from '../database/queries/medicine';
import { getById as getPatientById } from '../database/queries/patient';
import { getDoctorById } from '../database/queries/doctor';

export default {
  // Pharmacy exists
  checkPharmacyExists:async (req, res, next) => {
    db.query(getOneById, [req.body.phid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Pharmacy ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
  // Medicine exists
  checkMedicineExists:async (req, res, next) => {
    db.query(getById, [req.body.mid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Medicine ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },

  // Doctor exists
  checkDoctorExists:async (req, res, next) => {
    db.query(getDoctorById, [req.body.docid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Doctor ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
  // Patient exists
  checkPatientExists:async (req, res, next) => {
    db.query(getPatientById, [req.body.patid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Patient ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
};

import { MESSAGES } from "../constants/ResponceMessages";
import { STATUSES } from "../constants/ResponseStatuses";
import db from "../database/connection/query";
import { getOneById } from "../database/queries/pharmacy";
import { getById } from "../database/queries/medicine";

export default [
  //Pharmacy exists
  async (req, res, next) => {
    db.query(getOneById,[req.body.phid])
      .then(({ rows }) => {
        if (rows.length>0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status:STATUSES.NOTFOUND,
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
 //Medicine exists
 async (req, res, next) => {
    db.query(getById,[req.body.mid])
      .then(({ rows }) => {
        if (rows.length>0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status:STATUSES.NOTFOUND,
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
 
];

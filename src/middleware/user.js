import { MESSAGES } from "../constants/ResponceMessages";
import { STATUSES } from "../constants/ResponseStatuses";
import db from "../database/connection/_query";
import { getByEmail } from "../database/queries/User";

export default [
  //Supper user
  async (req, res, next) => {
    let {u_email } = req.user;
    db.query(getByEmail, [u_email])
      .then(({ rows }) => {
        if (rows[0].u_role === "SUPER_ADMIN") {
          next();
        } else {
          res.status(STATUSES.UNAUTHORIZED).send({
            status:STATUSES.UNAUTHORIZED,
            message: MESSAGES.UNAUTHORIZED,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.BAD_REQUEST).send({
          error: err.message,
        });
      });
  },
  //check if user exists
  async (req, res, next) => {
    let {u_email } = req.user;
    db.query(getByEmail, [u_email])
      .then(({ rows }) => {
        if (rows[0].u_role === "SUPER_ADMIN") {
          next();
        } else {
          res.status(STATUSES.UNAUTHORIZED).send({
            status:STATUSES.UNAUTHORIZED,
            message: MESSAGES.UNAUTHORIZED,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.BAD_REQUEST).send({
          error: err.message,
        });
      });
  },
 
];

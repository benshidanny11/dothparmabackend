/* eslint-disable camelcase */
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import db from '../database/connection/_query';
import { getByEmail,checkExist } from '../database/queries/User';

export default {
  // Supper user
  checkISAdmin: async (req, res, next) => {
    const { u_email } = req.user;
    db.query(getByEmail, [u_email])
      .then(({ rows }) => {
        if (rows[0].u_role === 'SUPER_ADMIN') {
          next();
        } else {
          res.status(STATUSES.UNAUTHORIZED).send({
            status: STATUSES.UNAUTHORIZED,
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
  // check if user exists
  checkUserExists: async (req, res, next) => {
    const { email,phone } = req.body;
    db.query(checkExist, [email,phone])
      .then(({ rows }) => {
        if (rows.length==0) {
          console.log(rows)
          next();
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: MESSAGES.ALREDY_EXISTS,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.BAD_REQUEST).send({
          error: err.message,
        });
      });
  },

};

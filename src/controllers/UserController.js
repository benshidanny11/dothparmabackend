/* eslint-disable no-unused-vars */
import moment from 'moment';
import bcrypt from 'bcrypt';
import User from '../database/models/User';

const UserController = {
  login: async (req, res) => {
    const data = [req.body.email, req.body.password];
    User.login(data)
      .then((results) => {
        if (results.user) {
          res.status(200).send({
            token: results.token,
            status: 200,
            message: results.message,
            user: results.user.rows,
          });
        } else {
          res.status(400).send({
            status: 400,
            message: results,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err,
        });
      });
  },
};

export default UserController;

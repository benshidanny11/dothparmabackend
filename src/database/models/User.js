import bcrypt from 'bcrypt';
import db from '../connection/_query';
import { generateToken } from '../../utils/_auth';
import {
  getByEmail,
  create,
} from '../queries/User';

const User = {
  login: async (data) => {
    try {
      const user = await db.query(getByEmail, [data[0]]);
      if (user.rowCount) {
        if (bcrypt.compareSync(data[1], user.rows[0].u_password)) {
          const payload = {
            names: user.rows[0].u_name,
            email: user.rows[0].u_email,
            phonenumber: user.rows[0].u_phone,
            role: user.rows[0].u_name,
            userid: user.rows[0].u_id,
          };
          const token = await generateToken(payload);
          return {
            token,
            user: user.rows,
            message: 'sussesfully logged in',
          };
        }
        return {
          message: 'password is incorrect',
        };
      }
      return {
        message: 'Invalid email',
      };
    } catch (error) {
      return error;
    }
  },
  findAll: async () => {

  },
  create: async (data) => {
    const payload = {
      names: data[0],
      email: data[1],
      phonenumber: data[2],
      role: data[3],
    };
    const token = await generateToken(payload);
    const user = await db.query(create, data);
    return {
      user,
      token,
    };
  },
  update: async () => {

  },
  destroy: async () => {

  },
};

export default User;

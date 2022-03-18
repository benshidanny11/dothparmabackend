import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../connection/query';
import {create} from '../queries/User';
import  {v4 as uuidv4} from 'uuid';

dotenv.config();
 const user=[
  uuidv4(),
  "Danny Benshi",
  process.env.ADMIN_EMAIL,
  "0784871958",
  bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  "SUPER_ADMIN",
  moment(new Date())
 ]

db.query(create,user).then((userResponse)=>{
console.log(userResponse.rows[0])
}).catch((err)=>{
    console.log(err)
});

import connection from "../connection";
import schemaConfig from './_config';

const con = connection();
export default {
  db: schemaConfig,
  execute: (migrations, message) => {
    Promise.all([migrations])
    .then((result) => {
      return result[0].map(({ query, name }, index) => {
         return new Promise((reslove, reject) =>{
          con.query(query).then((result) => {
            console.log(`${name} ${message}`); 
            reslove(result)
          }).catch((error) =>{
            reject(error)
          })
         })
      })
    })
  }
}
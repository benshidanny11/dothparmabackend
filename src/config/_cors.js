import cors from 'cors';
const origins =  ['http://localhost:3000/', 'http://localhost:3000/'];
export default {
  origin: (origin, callback) => {
    if (origins.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
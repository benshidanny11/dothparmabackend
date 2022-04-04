import "regenerator-runtime";
import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import api from './routers'
import globlaMiddleWare from './middleware/_global_middle_ware';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 7890;
const env = process.env.NODE_ENV;
globlaMiddleWare(app);

//calling all routers
app.use('/',api);
app.listen(PORT, () => {
  
  console.log(`Primary mis is app and running on PORT ${PORT} on server ${process.env.SERVER} in ${env} mode `);
});
export default app;
import express from "express";
import Auth from "./_Auth";
import Pharmacy from "./_pharmacy";
import Doctor from "./_doctor";

const api = express();


api.use("/api/user", Auth);
api.use("/api/pharmacy",Pharmacy);
api.use("/api/doctor",Doctor);
api.get("/", (req, res) => {
  res.status(200).send({
    status: 200,
    message: "Welcome to primary mis",
  });
});

api.use("/", (req, res) => {
    res.status(404).send({
      status: 404,
      message: "Page not found",
    });
  });
  
export default api;

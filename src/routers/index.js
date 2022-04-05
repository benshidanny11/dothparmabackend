import express from "express";
import Auth from "./_Auth";
import Pharmacy from "./_pharmacy";
import Doctor from "./_doctor";
import Medicine from "./_medicine";
import Order from "./_order";

const api = express();

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
api.use("/api/user", Auth);
api.use("/api/pharmacy",Pharmacy);
api.use("/api/doctor",Doctor);
api.use("/api/medicine",Medicine);
api.use("/api/orders",Order);

  
export default api;

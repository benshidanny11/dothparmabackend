import express from "express";
import Auth from "./_Auth";

const api = express();


api.use("/api/user", Auth);
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

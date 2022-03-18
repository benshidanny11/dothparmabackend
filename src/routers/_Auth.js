import Auth from "../controllers/Auth";
import Validator from "../middleware/_validator";
import express from "express";

const router = express.Router();

router.post("/login", Validator("login"), Auth.login);

export default router;
import express from 'express';
import Auth from '../controllers/UserController';
import Validator from '../middleware/_validator';

const router = express.Router();

router.post('/login', Validator('login'), Auth.login);

export default router;

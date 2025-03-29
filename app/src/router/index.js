import { Router } from 'express';
import login from './login/index.js';
import register from './register/index.js';
import users from './users/index.js';

const router = Router();

login(router);

register(router);

users(router);

export default router;

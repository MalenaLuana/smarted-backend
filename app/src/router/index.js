import { Router } from 'express';
import login from './login/index.js';
import register from './register/index.js';

const router = Router();

login(router);

register(router);

export default router;

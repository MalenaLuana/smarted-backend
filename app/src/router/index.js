import { Router } from 'express';
import login from './login/index.js';
import register from './register/index.js';
import users from './users/index.js';
import products from './products/index.js';
import category from './category/index.js';

const router = Router();

login(router);

register(router);

users(router);

products(router);

category(router);

export default router;

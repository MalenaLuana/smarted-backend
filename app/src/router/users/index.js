import getUserPersonalData from '../../controllers/users/index.js';
import { authMiddleware } from '../../middlewares/auth.js';

const users = (router) => {
  router.get('/users/:id/personalData', authMiddleware, getUserPersonalData);
};
export default users;

import personalDataController from '../../controllers/users/index.js';
import { authMiddleware } from '../../middlewares/auth.js';

const users = (router) => {
  //obtener data personal de los usuarios
  router.get(
    '/users/:id/personalData',
    authMiddleware,
    personalDataController.getUserPersonalData,
  );
  //Actualizar datos personales
  router.post(
    '/users/:id/personalData',
    authMiddleware,
    personalDataController.updatePersonalData,
  );
};
export default users;

import createCategory from '../../controllers/products/createCategory.js';
import checkRole from '../../middlewares/checkRole.js';
import { USER_ROLES } from '../../utils/constants.js';

const category = (router) => {
  router.post('/category', checkRole(USER_ROLES.admin), createCategory);
};

export default category;

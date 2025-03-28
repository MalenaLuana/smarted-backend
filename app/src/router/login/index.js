import comparePassword from '../../controllers/login/comparePassword.js';

const login = (router) => {
  router.post('/login', comparePassword);
};
export default login;

import createUser from '../../controllers/register/createUser.js';

const register = (router) => {
  router.post('/register', createUser);
};

export default register;

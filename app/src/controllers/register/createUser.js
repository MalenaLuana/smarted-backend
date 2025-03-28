import { sequelize } from '../../db.js';
import language from '../../language/index.js';
import ERROR_STATUS from '../../utils/constants.js';

const createUser = async (req, res) => {
  const { users } = sequelize.models;
  const { register } = language;
  const { name, email, password, authType } = req.body;
  try {
    const user = await users.findOne({
      where: {
        email,
      },
    });
    if (user) {
      res.status(404).json({
        error: ERROR_STATUS.userAlreadyExist,
        message: register.userAlreadyExist,
      });
    } else {
      await users.create({
        user_name: name,
        email,
        password: password ?? null,
        authType,
      });
      res.status(200).json({ status: 200, message: language.register.success });
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ error: ERROR_STATUS.default, message: error.message });
  }
};

export default createUser;

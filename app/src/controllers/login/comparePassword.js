import bcrypt from 'bcrypt';
import { sequelize } from '../../db.js';
import language from '../../language/index.js';
import ERROR_STATUS from '../../utils/constants.js';
import jwt from 'jsonwebtoken';

const comparePassword = async (req, res) => {
  const { users } = sequelize.models;

  const { email, password } = req.body;
  const { login } = language;
  if (email && password) {
    try {
      const userData = await users.findOne({
        where: {
          email,
        },
      });

      if (userData === null) {
        res.status(400).send({
          error: ERROR_STATUS.userNotfound,
          message: login.userNotfound,
        });
      } else {
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (passwordMatch) {
          const token = jwt.sign(
            { id: userData.id, email: userData.email },
            'secreto',
            {
              expiresIn: '5d',
            },
          );
          const { email, user_name, role, id } = userData.dataValues;
          const response = {
            user: { id, email, name: user_name, role },
            token,
          };
          res.status(200).json(response);
        } else {
          res.status(404).json({
            error: ERROR_STATUS.wrongPassword,
            message: login.wrongPassword,
          });
        }
      }
    } catch (error) {
      res
        .status(404)
        .json({ error: ERROR_STATUS.default, message: error.message });
    }
  }
};

export default comparePassword;

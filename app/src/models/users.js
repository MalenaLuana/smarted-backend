import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import language from '../language/index.js';

const usersModels = (sequelize) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_validated: { type: DataTypes.BOOLEAN, defaultValue: false },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isPasswordValid(value) {
            if (this.authType === 'local' && !value) {
              throw new Error(language.register.passwordRequired);
            }
          },
        },
      },
      authType: {
        type: DataTypes.ENUM('local', 'social'),
        allowNull: false,
        defaultValue: 'local',
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      hooks: {
        beforeCreate: (users) => {
          const salt = bcrypt.genSaltSync();
          if (users.password) {
            // eslint-disable-next-line no-param-reassign
            users.password = bcrypt.hashSync(users.password, salt);
          }
        },
      },
      instanceMethods: {
        validPassword(password) {
          return bcrypt.compareSync(password, this.password);
        },
      },
      freezeTableName: true,
    },
  );
  return Users;
};

export default usersModels;

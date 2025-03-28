import { DataTypes } from 'sequelize';

const personalDataModel = (sequelize) => {
  const PersonalData = sequelize.define('personal_data', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return PersonalData;
};

export default personalDataModel;

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
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDay: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wishlist: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
  });

  return PersonalData;
};

export default personalDataModel;

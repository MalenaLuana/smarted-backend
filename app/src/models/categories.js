import { DataTypes } from 'sequelize';

const category = (sequelize) => {
  const Category = sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      parent_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'category',
          key: 'id',
        },
      },
    },
    {
      freezeTableName: true,
    },
  );
  return Category;
};

export default category;

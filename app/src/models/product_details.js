import { DataTypes } from 'sequelize';

const productDetailsModel = (sequelize) => {
  const ProductsDetails = sequelize.define(
    'products_details',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      attribute_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attribute_value: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    },
  );
  return ProductsDetails;
};

export default productDetailsModel;

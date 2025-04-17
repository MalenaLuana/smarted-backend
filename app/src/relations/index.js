/* eslint-disable camelcase */
const modelRelations = (models) => {
  const { users, personal_data, products, category, products_details } = models;

  users.hasOne(personal_data, { foreignKey: 'user_id' });
  personal_data.belongsTo(users, { foreignKey: 'user_id' });

  category.hasMany(products, { foreignKey: 'category_id' });
  products.belongsTo(category, {
    foreignKey: 'category_id',
  });

  products.hasMany(models.products_details, {
    foreignKey: 'product_id',
    as: 'details',
  });

  products_details.belongsTo(products, {
    foreignKey: 'product_id',
  });
};

export default modelRelations;

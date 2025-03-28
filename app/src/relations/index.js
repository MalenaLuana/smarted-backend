/* eslint-disable camelcase */
const modelRelations = (models) => {
  const { users, personal_data } = models;

  users.hasOne(personal_data, { foreignKey: 'user_id' });
  personal_data.belongsTo(users, { foreignKey: 'user_id' });
};

export default modelRelations;

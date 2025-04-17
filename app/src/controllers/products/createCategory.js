import { sequelize } from '../../db.js';
import ERROR_STATUS from '../../utils/constants.js';

const createCategory = async (req, res) => {
  const { category } = sequelize.models;
  const { name, description, parent_id } = req.body;
  try {
    await category.findOrCreate({
      where: { name },
      defaults: {
        name,
        description,
        parent_id,
      },
    });
    res
      .status(200)
      .json({ status: 200, message: 'Categoría creada con éxito' });
  } catch (error) {
    res
      .status(ERROR_STATUS.default)
      .json({ status: ERROR_STATUS.default, message: error.message });
  }
};
export default createCategory;

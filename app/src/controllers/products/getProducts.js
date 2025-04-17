import { sequelize } from '../../db.js';
import ERROR_STATUS from '../../utils/constants.js';

const allProducts = async (_, res) => {
  const { products } = sequelize.models;
  try {
    const allProducts = await products.findAll({
      where: { is_active: true },
      attributes: ['id', 'name', 'price', 'image', 'description', 'discount'],
    });
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ error: ERROR_STATUS.default, message: error.message });
  }
};

const productById = async (req, res) => {
  const { products } = sequelize.models;
  const { id } = req.params;
  try {
    const product = await products.findOne({
      where: { id },
      attributes: ['id', 'name', 'price', 'image', 'description', 'discount'],
    });
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ error: ERROR_STATUS.default, message: error.message });
  }
};

const productDetails = async (req, res) => {
  const { products_details } = sequelize.models;
  const { id } = req.params;
  try {
    const productData = await products_details.findAll({
      where: { product_id: id },
      attributes: ['attribute_name', 'attribute_value'],
    });
    res.status(200).json(productData);
  } catch (error) {
    res.status(400).json({ error: 400, message: error.message });
  }
};
const getProducts = {
  allProducts,
  productDetails,
  productById,
};

export default getProducts;

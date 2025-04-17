import { sequelize } from '../../db.js';
import language from '../../language/index.js';
import ERROR_STATUS from '../../utils/constants.js';

const singleProduct = async (req, res) => {
  const { products } = sequelize.models;
  const { name, description, price, stock, image, discount } = req.body;
  const { products: productsText } = language;
  if (name && price) {
    try {
      const productData = await products.findOne({ where: { name } });
      if (!productData) {
        await products.create({
          name,
          description,
          price,
          stock,
          image,
          discount,
        });
        res
          .status(200)
          .json({ status: 200, message: productsText.createSuccess });
      }
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .json({ error: ERROR_STATUS.default, message: error.message });
    }
  }
};

const detailProduct = async (req, res) => {
  const { products_details } = sequelize.models;
  const { id } = req.params;
  const { products } = language;
  const { attribute_name, attribute_value } = req.body;

  if (!attribute_name || !attribute_value || !id) {
    res
      .status(ERROR_STATUS.missingFields)
      .json({ error: ERROR_STATUS.missingFields, message: error.message });
  }

  try {
    await products_details.findOrCreate({
      where: {
        product_id: id,
        attribute_name,
      },
      defaults: {
        product_id: id,
        attribute_name,
        attribute_value,
      },
    });
    res
      .status(200)
      .json({ status: 200, message: products.createDetailsSuccess });
  } catch (error) {
    res
      .status(ERROR_STATUS.default)
      .json({ error: ERROR_STATUS.default, message: error.message });
  }
};

const createProduct = {
  singleProduct,
  detailProduct,
};
export default createProduct;

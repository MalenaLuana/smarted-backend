import checkRole from '../../middlewares/checkRole.js';
import { USER_ROLES } from '../../utils/constants.js';
import getProducts from '../../controllers/products/getProducts.js';
import createProduct from '../../controllers/products/createProduct.js';

const products = (router) => {
  //Obtener todos los productos
  router.get('/products', getProducts.allProducts);

  //Obtener producto por id
  router.get('/products/:id', getProducts.productById);

  //Crear producto
  router.post(
    '/products',
    checkRole(USER_ROLES.admin),
    createProduct.singleProduct,
  );

  //Crear detalle del producto
  router.post(
    '/products/:id/details',
    checkRole(USER_ROLES.admin),
    createProduct.detailProduct,
  );

  //Obtener detalles del producto
  router.get('/products/:id/details', getProducts.productDetails);
};

export default products;

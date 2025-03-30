import { sequelize } from '../../db.js';

const updatePersonalData = async (req, res) => {
  const { personal_data, users } = sequelize.models;
  const { id } = req.params;
  try {
    const { name, last_name, birthDay, phone, image, wishlist } = req.body;

    const userExists = await users.findByPk(id);
    if (!userExists) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    const existingData = await personal_data.findOne({
      where: { user_id: id },
    });
    if (!existingData) {
      await personal_data.create({
        user_id: id,
        name,
        last_name,
        birthDay,
        phone,
        image,
        wishlist,
      });
      res.status(201).json({ message: 'Datos personales creados  con exito' });
    } else {
      await personal_data.update(
        { name, last_name, birthDay, phone, image, wishlist },
        { where: { user_id: id } },
      );
      res
        .status(200)
        .json({ message: 'Datos personales actualizados correctamente' });
    }
  } catch (error) {
    res.status(201).json({
      message: 'No se pudo actualizar la información',
      error: error.message,
    });
  }
};

const getUserPersonalData = async (req, res) => {
  const { personal_data } = sequelize.models;
  const { id } = req.params;
  try {
    const userData = await personal_data.findOne({
      where: { user_id: id },
    });
    if (!userData) {
      throw new Error('Datos personales no encontrados');
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los datos' });
  }
};

const personalDataController = {
  getUserPersonalData,
  updatePersonalData,
};

export default personalDataController;

import { sequelize } from '../../db.js';

export const getUserPersonalData = async (req, res) => {
  const { personalData } = sequelize.models;
  const { id } = req.params;
  try {
    const userData = await personalData.findOne({
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

export default getUserPersonalData;

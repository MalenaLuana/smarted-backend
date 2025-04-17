import jwt from 'jsonwebtoken';

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'No autorizado' });

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, 'secreto');
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};

export default checkRole;

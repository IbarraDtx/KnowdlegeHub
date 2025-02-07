const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ sucess: false, message: 'No autenticado' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ sucess: false, message: 'No tienes permisos para acceder a esta ruta' });
        }

        next();
    };
};

module.exports = roleMiddleware;
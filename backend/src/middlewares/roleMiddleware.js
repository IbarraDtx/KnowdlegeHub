const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !requiredRole.includes(req.user.role)) {
            return res.status(403).json({ messagge: "Acceso denegado no tienes permisos suficientes" });
        }
        next();
    };
}

module.exports = roleMiddleware;
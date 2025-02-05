import passport from "passport";

// 📌 Middleware para proteger rutas
export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "No autorizado" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// 📌 Middleware para verificar rol de usuario
export const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};

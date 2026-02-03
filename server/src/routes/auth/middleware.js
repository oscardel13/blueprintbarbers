// routes/auth/middleware.js
function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated && req.isAuthenticated() && req.user;
  if (!isLoggedIn) return res.status(401).json({ error: "You must log in!" });
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    if (!roles.includes(role))
      return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

module.exports = {
  checkLoggedIn,
  requireRole,
};

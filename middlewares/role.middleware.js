module.exports = function(role) {
  return (req, res, next) => {
    const currentUser = req.user;

    const isValidRole = currentUser.roles.find(r => {
      return r.name === role;
    });

    if (!isValidRole) {
      const error = new Error();
      error.status = 401;
      error.message = "Unauthorize";
      throw error;
    }

    next();
  };
};

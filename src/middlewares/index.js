module.exports = {
  ErrorMiddleware: require("./error.middleware"),
  NotFoundMiddleware: require("./notfound.middleware"),
  AuthMiddleware: require("./auth.middleware"),
  RoleMiddleware: require("./role.middleware"),
  CacheMiddleware: require("./cache.middleware"),
  ParseIntMiddleware: require("./parseInt.middleware")
};

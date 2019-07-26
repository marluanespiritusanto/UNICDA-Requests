const { createContainer, asValue, asClass, asFunction } = require("awilix");
const app = require("./");
const config = require("../config");

// routes
const Routes = require("../routes");
const {
  HomeRoutes,
  AuthRoutes,
  RoleRoutes,
  UserRoutes
} = require("../routes/index.routes");

// controllers
const {
  HomeController,
  AuthController,
  RoleController,
  UserController
} = require("../controllers");

// repositories
const { UserRepository, RoleRepository } = require("../repositories");

// services
const {
  HomeService,
  AuthService,
  RoleService,
  UserService
} = require("../services");

// models
const { Role, User } = require("../models");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    config: asValue(config),
    router: asFunction(Routes).singleton()
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    RoleRoutes: asFunction(RoleRoutes).singleton()
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    UserService: asClass(UserService).singleton(),
    RoleService: asClass(RoleService).singleton()
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    RoleController: asClass(RoleController.bind(RoleController)).singleton()
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    RoleRepository: asClass(RoleRepository).singleton()
  })
  .register({
    Role: asValue(Role),
    User: asValue(User)
  });

module.exports = container;

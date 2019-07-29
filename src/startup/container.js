const { createContainer, asValue, asClass, asFunction } = require("awilix");
const app = require("./");
const config = require("../config");

// routes
const Routes = require("../routes");
const {
  HomeRoutes,
  AuthRoutes,
  RoleRoutes,
  UserRoutes,
  RequestRoutes,
  FormTypeRoutes
} = require("../routes/index.routes");

// controllers
const {
  HomeController,
  AuthController,
  RoleController,
  UserController,
  RequestController,
  FormTypeController
} = require("../controllers");

// repositories
const {
  UserRepository,
  RoleRepository,
  RequestRepository,
  FormTypeRepository
} = require("../repositories");

// services
const {
  HomeService,
  AuthService,
  RoleService,
  UserService,
  RequestService,
  FormTypeService
} = require("../services");

// models
const { Role, User, Request, RequestForm, FormType } = require("../models");

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
    RoleRoutes: asFunction(RoleRoutes).singleton(),
    RequestRoutes: asFunction(RequestRoutes).singleton(),
    FormTypeRoutes: asFunction(FormTypeRoutes).singleton()
  })
  .register({
    HomeService: asClass(HomeService).singleton(),
    AuthService: asClass(AuthService).singleton(),
    UserService: asClass(UserService).singleton(),
    RoleService: asClass(RoleService).singleton(),
    RequestService: asClass(RequestService).singleton(),
    FormTypeService: asClass(FormTypeService).singleton()
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    RoleController: asClass(RoleController.bind(RoleController)).singleton(),
    RequestController: asClass(
      RequestController.bind(RequestController)
    ).singleton(),
    FormTypeController: asClass(
      FormTypeController.bind(FormTypeController)
    ).singleton()
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    RoleRepository: asClass(RoleRepository).singleton(),
    RequestRepository: asClass(RequestRepository).singleton(),
    FormTypeRepository: asClass(FormTypeRepository).singleton()
  })
  .register({
    Role: asValue(Role),
    User: asValue(User),
    Request: asValue(Request),
    RequestForm: asValue(RequestForm),
    FormType: asValue(FormType)
  });

module.exports = container;

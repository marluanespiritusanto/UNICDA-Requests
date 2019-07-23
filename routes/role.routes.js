const router = require("express").Router();
const { RoleController } = require("../controllers");

router.get("", RoleController.getAllRoles);
router.get("/:id", RoleController.getRole);
router.post("", RoleController.createRole);
router.patch("/:id", RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

module.exports = router;

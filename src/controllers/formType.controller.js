let _formTypeService = null;

class FormTypeController {
  constructor({ FormTypeService }) {
    _formTypeService = FormTypeService;
  }

  async getFormType(req, res) {
    const { id } = req.params;
    const formType = await _formTypeService.getFormType(id);
    return res.send(formType);
  }

  async getAllFormTypes(req, res) {
    const formTypes = await _formTypeService.getAllFormTypes();
    return res.send(formTypes);
  }

  async createFormType(req, res) {
    const { body } = req;
    const createdFormType = await _formTypeService.createFormType(body);
    return res.status(201).send(createdFormType);
  }

  async updateFormType(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedFormType = await _formTypeService.updateFormType(id, body);
    return res.send(updatedFormType);
  }

  async deleteFormType(req, res) {
    const { id } = req.params;
    const deletedUser = await _formTypeService.deleteFormType(id);
    return res.send(deletedUser);
  }
}

module.exports = FormTypeController;

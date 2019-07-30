let _formTypeRepository = null;

class FormTypeService {
  constructor({ FormTypeRepository }) {
    _formTypeRepository = FormTypeRepository;
  }
  async getFormType(id) {
    const formType = await _formTypeRepository.get(id);
    return formType;
  }

  async getAllFormTypes(pageSize, pageNum) {
    const formTypes = await _formTypeRepository.getAll(pageSize, pageNum);
    return formTypes;
  }

  async createFormType(formType) {
    const createdFormType = await _formTypeRepository.create(formType);
    return createdFormType;
  }

  async updateFormType(id, formType) {
    const updatedFormType = await _formTypeRepository.update(id, formType);
    return updatedFormType;
  }

  async deleteFormType(id) {
    return await _formTypeRepository.delete(id);
  }
}

module.exports = FormTypeService;

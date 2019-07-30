const { StatusHelper } = require("../helpers");

let _formType = null;

class FormTypeRepository {
  constructor({ FormType }) {
    _formType = FormType;
  }

  async get(id) {
    const formType = await _formType.findOne({
      _id: id,
      status: StatusHelper.ACTIVE
    });
    return formType;
  }

  async getFormTypeByName(name) {
    const formType = await _formType.findOne({
      name,
      status: StatusHelper.ACTIVE
    });
    return formType;
  }

  async getAll(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);

    const formTypes = await _formType
      .find({ status: StatusHelper.ACTIVE })
      .skip(skips)
      .limit(pageSize);

    return formTypes;
  }

  async create(formType) {
    const createdFormType = await _formType.create([formType]);
    return createdFormType;
  }

  async update(id, formType) {
    const updatedFormType = await _formType.findByIdAndUpdate(
      { _id: id },
      formType,
      {
        new: true
      }
    );

    return updatedFormType;
  }

  async delete(id) {
    const deletedFormType = await _formType.findByIdAndDelete(id);
    return deletedFormType.toJSON();
  }

  async createFormTypeForm(form) {
    const createdFormTypeForm = await _formTypeForm.create([form]);
    return createdFormTypeForm;
  }
}

module.exports = FormTypeRepository;

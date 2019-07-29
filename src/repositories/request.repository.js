const { StatusHelper } = require("../helpers");

let _request,
  _requestForm,
  _formType = null;

class RequestRepository {
  constructor({ Request, RequestForm, FormType }) {
    _request = Request;
    _requestForm = RequestForm;
    _formType = FormType;
  }

  async get(id) {
    const request = await _request.findOne({
      _id: id,
      status: StatusHelper.ACTIVE
    });
    return request;
  }

  async getRequestByName(name) {
    const request = await _request.findOne({
      name,
      status: StatusHelper.ACTIVE
    });
    return request;
  }

  async getAll() {
    const requests = await _request.find({ status: StatusHelper.ACTIVE });
    return requests;
  }

  async create(request) {
    const createdRequest = await _request.create([request]);
    return createdRequest;
  }

  async update(id, request) {
    const updatedRequest = await _request.findByIdAndUpdate(
      { _id: id },
      request,
      {
        new: true
      }
    );

    return updatedRequest;
  }

  async delete(id) {
    const deletedRequest = await _request.findByIdAndDelete(id);
    return deletedRequest.toJSON();
  }

  async createRequestForm(form) {
    const createdRequestForm = await _requestForm.create([form]);
    return createdRequestForm;
  }
}

module.exports = RequestRepository;

const { StatusHelper } = require("../helpers");

let _requestType = null;

class RequestRepository {
  constructor({ RequestType }) {
    _requestType = RequestType;
  }
  async get(id) {
    const request = await _requestType.findOne({
      _id: id,
      status: StatusHelper.ACTIVE
    });
    return request;
  }

  async getRequestByName(name) {
    const request = await _requestType.findOne({
      name,
      status: StatusHelper.ACTIVE
    });
    return request;
  }

  async getAll() {
    const requests = await _requestType.find({ status: StatusHelper.ACTIVE });
    return requests;
  }

  async create(request) {
    const createdRequest = await _requestType.create([request]);
    return createdRequest;
  }

  async update(id, request) {
    const updatedRequest = await _requestType.findByIdAndUpdate(
      { _id: id },
      request,
      {
        new: true
      }
    );

    return updatedRequest;
  }

  async delete(id) {
    const deletedRequest = await _requestType.findByIdAndDelete(id);
    return deletedRequest.toJSON();
  }
}

module.exports = RequestRepository;

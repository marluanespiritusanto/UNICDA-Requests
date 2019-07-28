let _requestRepository = null;

class RequestService {
  constructor({ RequestRepository }) {
    _requestRepository = RequestRepository;
  }
  async getRequest(id) {
    const request = await _requestRepository.get(id);
    return request;
  }

  async getRequestByName(name) {
    const request = await _requestRepository.getRequestByName(name);
    return request;
  }

  async getAllRequests() {
    const requests = await _requestRepository.getAll();
    return requests;
  }

  async createRequest(request) {
    const createdRequest = await _requestRepository.create(request);
    return createdRequest;
  }

  async updateRequest(id, request) {
    const updatedRequest = await _requestRepository.update(id, request);
    return updatedRequest;
  }

  async deleteRequest(id) {
    return await _requestRepository.delete(id);
  }
}

module.exports = RequestService;

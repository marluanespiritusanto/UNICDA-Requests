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

  async getAllRequests(pageSize, pageNum) {
    const requests = await _requestRepository.getAll(pageSize, pageNum);
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

  async createRequestForm(requestId, form) {
    const requestForm = form.map(({ formTypeId, label }) => {
      return {
        requestId,
        formTypeId,
        label
      };
    });

    const createdRequestForm = await _requestRepository.createRequestForm(
      requestForm
    );

    return createdRequestForm;
  }

  async getRequestForm(requestId) {
    const form = await _requestRepository.getRequestForm(requestId);
    return form;
  }
}

module.exports = RequestService;

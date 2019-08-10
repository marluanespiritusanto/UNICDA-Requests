const { StatusHelper } = require("../helpers");

let _requestRepository,
  _userRepository = null;

class RequestService {
  constructor({ RequestRepository, UserRepository }) {
    _requestRepository = RequestRepository;
    _userRepository = UserRepository;
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

  async setStepToRequest(id, stepId) {
    const stepRequest = {
      request: id,
      step: stepId
    };
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

  async createRequisition(userId, requestId, forms) {
    const requestRecord = await this.createRequestRecord(
      requestId,
      userId,
      forms
    );
    const requestSteps = await this.getRequestSteps(requestId);
    await this.createRequestHistory(requestSteps, requestRecord);

    return requestRecord;
  }

  async saveRequestForm(forms) {
    for (const form of forms) {
      await _requestRepository.updateRequestForm(form.formId, form.value);
    }
  }

  async getRequestSteps(requestId) {
    const requestSteps = await _requestRepository.getRequestSteps(requestId);
    return requestSteps;
  }

  async createRequestRecord(request, user, forms) {
    const requestRecord = await _requestRepository.createRequestRecord({
      request,
      user,
      forms
    });

    return requestRecord;
  }

  async createRequestHistory(steps, requestRecord) {
    const FIRST_ORDER = 1;
    const requestHistories = [];

    for (const step of steps) {
      const reviewer = await this.getAvailableReviewer(step);
      const requestHistory = {
        reviewer,
        requestRecord,
        requestStep: step._id
      };

      if (step.order === FIRST_ORDER) {
        requestHistory.status = StatusHelper.APPROVE_PENDING;
      }

      requestHistories.push(requestHistory);
    }

    await _requestRepository.createRequestHistory(requestHistories);
  }

  async getRequestHistory(requestRecordId) {
    const requestHistory = await _requestRepository.getRequestHistory(
      requestRecordId
    );

    return requestHistory;
  }

  async getAvailableReviewer(step) {
    const {
      step: { roleOfficer }
    } = step;
    const reviewer = await _userRepository.getUserByRole(roleOfficer.id);
    return reviewer;
  }

  async getCreatedRequests(pageSize, pageNum) {
    const requests = await _requestRepository.getCreatedRequests(
      pageSize,
      pageNum
    );

    return requests;
  }

  async getCreatedRequestsByUser(userId, pageSize, pageNum) {
    const requests = await _requestRepository.getCreatedRequestsByUser(
      userId,
      pageSize,
      pageNum
    );

    return requests;
  }

  async getPendingRequests(reviewerId, pageSize, pageNum) {
    const requests = await _requestRepository.getPendingRequests(
      reviewerId,
      pageSize,
      pageNum
    );

    return requests;
  }

  async approveRequest(reviewerId, requestHistoryId) {
    const nextRequestStep = await _requestRepository.approveRequest(
      reviewerId,
      requestHistoryId
    );

    return nextRequestStep;
  }

  async deleteRequestRecord(requestRecordId) {
    return await _requestRepository.deleteRequestRecord(requestRecordId);
  }

  async disapproveRequest(requestHistoryId) {
    return await _requestRepository.disapproveRequest(requestHistoryId);
  }

  async getRecordFormValues(requestRecordId) {
    const values = await _requestRepository.getRecordFormValues(
      requestRecordId
    );

    return values;
  }
}

module.exports = RequestService;

let _requestService = null;

class RequestController {
  constructor({ RequestService }) {
    _requestService = RequestService;
  }

  async getRequest(req, res) {
    const { requestId } = req.params;
    const request = await _requestService.getRequest(requestId);
    return res.send(request);
  }

  async getAllRequests(req, res) {
    const { pageSize, pageNum } = req.query;

    const requests = await _requestService.getAllRequests(pageSize, pageNum);
    return res.send(requests);
  }

  async createRequest(req, res) {
    const { body } = req;
    const createdRequest = await _requestService.createRequest(body);
    return res.status(201).send(createdRequest);
  }

  async updateRequest(req, res) {
    const { body } = req;
    const { requestId } = req.params;
    const updatedRequest = await _requestService.updateRequest(requestId, body);
    return res.send(updatedRequest);
  }

  async deleteRequest(req, res) {
    const { requestId } = req.params;
    const deletedUser = await _requestService.deleteRequest(requestId);

    return res.send(deletedUser);
  }

  async createRequestForm(req, res) {
    const { requestId } = req.params;
    const { form } = req.body;
    const createdRequestForm = await _requestService.createRequestForm(
      requestId,
      form
    );

    return res.status(201).send(createdRequestForm);
  }

  async getRequestForm(req, res) {
    const { requestId } = req.params;
    const form = await _requestService.getRequestForm(requestId);
    return res.send(form);
  }

  async createRequisition(req, res) {
    const { body: forms } = req;
    const { id: userId } = req.user;
    const { requestId } = req.params;
    const createdRequisition = await _requestService.createRequisition(
      userId,
      requestId,
      forms
    );

    return res.status(201).send(createdRequisition);
  }

  async getRequestHistory(req, res) {
    const { requestRecordId } = req.params;
    const requestHistory = await _requestService.getRequestHistory(
      requestRecordId
    );

    return res.send(requestHistory);
  }

  async getCreatedRequests(req, res) {
    const { pageSize, pageNum } = req.query;
    const requests = await _requestService.getCreatedRequests(
      pageSize,
      pageNum
    );

    return res.send(requests);
  }

  async getCreatedRequestsByUser(req, res) {
    const { pageSize, pageNum } = req.query;
    const {
      user: { id: userId }
    } = req;

    const requests = await _requestService.getCreatedRequestsByUser(
      userId,
      pageSize,
      pageNum
    );

    return res.send(requests);
  }

  async getPendingRequests(req, res) {
    const { pageSize, pageNum } = req.query;
    const {
      user: { id: userId }
    } = req;

    const requests = await _requestService.getPendingRequests(
      userId,
      pageSize,
      pageNum
    );

    return res.send(requests);
  }

  async approveRequest(req, res) {
    const {
      user: { id: reviewerId }
    } = req;
    const { requestHistoryId } = req.params;

    const response = await _requestService.approveRequest(
      reviewerId,
      requestHistoryId
    );

    return res.send(response);
  }

  async deleteRequestRecord(req, res) {
    const { requestRecordId } = req.params;
    const deletedRequest = await _requestService.deleteRequestRecord(
      requestRecordId
    );

    return res.send(deletedRequest);
  }

  async disapproveRequest(req, res) {
    const { requestHistoryId } = req.params;
    const disapprovedRequest = await _requestService.disapproveRequest(
      requestHistoryId
    );

    return res.send(disapprovedRequest);
  }

  async getRecordFormValues(req, res) {
    const { requestRecordId } = req.params;
    const values = await _requestService.getRecordFormValues(requestRecordId);

    return res.send(values);
  }
}

module.exports = RequestController;

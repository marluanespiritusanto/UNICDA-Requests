let _requestService = null;

class RequestController {
  constructor({ RequestService }) {
    _requestService = RequestService;
  }

  async getRequest(req, res) {
    const { id } = req.params;
    const request = await _requestService.getRequest(id);
    return res.send(request);
  }

  async getAllRequests(req, res) {
    const { pageSize, pageNum } = req.query;

    const requests = await _requestService.getAllRequests(
      parseInt(pageSize),
      parseInt(pageNum)
    );
    return res.send(requests);
  }

  async createRequest(req, res) {
    const { body } = req;
    const createdRequest = await _requestService.createRequest(body);
    return res.status(201).send(createdRequest);
  }

  async updateRequest(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedRequest = await _requestService.updateRequest(id, body);
    return res.send(updatedRequest);
  }

  async deleteRequest(req, res) {
    const { id } = req.params;
    const deletedUser = await _requestService.deleteRequest(id);

    return res.send(deletedUser);
  }

  async setStepToRequest(req, res) {
    const { id } = req.params;
    const { stepId } = req.body;
    const step = await _requestService.setStepToRequest(id, stepId);

    return res.send(step);
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
      parseInt(pageSize),
      parseInt(pageNum)
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
      parseInt(pageSize),
      parseInt(pageNum)
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
      parseInt(pageSize),
      parseInt(pageNum)
    );

    return res.send(requests);
  }
}

module.exports = RequestController;

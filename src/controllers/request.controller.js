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
    const { requisition } = req.body;
    const createdRequisition = await _requestService.createRequisition(
      requisition
    );

    return res.status(201).send(createdRequisition);
  }
}

module.exports = RequestController;

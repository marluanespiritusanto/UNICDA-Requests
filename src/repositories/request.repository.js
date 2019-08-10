const { StatusHelper } = require("../helpers");

let _request,
  _requestForm,
  _requestHistory,
  _formType,
  _requestStep,
  _requestRecord,
  _requestFormValue = null;

class RequestRepository {
  constructor({
    Request,
    RequestForm,
    FormType,
    RequestHistory,
    RequestRecord,
    RequestStep,
    RequestFormValue
  }) {
    _request = Request;
    _requestForm = RequestForm;
    _formType = FormType;
    _requestHistory = RequestHistory;
    _requestRecord = RequestRecord;
    _requestStep = RequestStep;
    _requestFormValue = RequestFormValue;
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

  async getAll(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);

    const requests = await _request
      .find({ status: StatusHelper.ACTIVE })
      .skip(skips)
      .limit(pageSize);

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
    const createdRequestForm = await _requestForm.create(form);
    return createdRequestForm;
  }

  async getRequestForm(requestId) {
    const form = await _requestForm
      .find({ requestId })
      .populate("formTypeId", "name");

    return form;
  }

  async createRequisition(requisition) {
    const createdRequisition = await _requestHistory.create([requisition]);
    return createdRequisition;
  }

  async updateRequestForm(formId, value) {
    await _requestForm.findByIdAndUpdate(formId, { value });
  }

  async createRequestRecord(requestRecord) {
    let { forms } = requestRecord;
    const formIds = (await _requestFormValue.create(forms)).map(
      form => form._id
    );
    requestRecord.forms = formIds;
    const createdRequestRecord = await _requestRecord.create([requestRecord]);
    return createdRequestRecord[0];
  }

  async getRequestSteps(requestId) {
    const steps = await _requestStep
      .find({ request: requestId })
      .populate({
        path: "step",
        populate: {
          path: "roleOfficer",
          model: "Role"
        }
      })
      .sort("order");

    return steps;
  }

  async createRequestHistory(requestHistory) {
    const createdRequestHistory = _requestHistory.create(requestHistory);
    return createdRequestHistory;
  }

  async getRequestHistory(requestRecordId) {
    const requestHistory = await _requestHistory
      .find({
        requestRecord: requestRecordId
      })
      .populate("reviewer")
      .populate({
        path: "requestStep",
        populate: {
          path: "step",
          model: "Step"
        }
      });

    return requestHistory;
  }

  async getCreatedRequests(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);

    const requests = await _requestRecord
      .find()
      .skip(skips)
      .limit(pageSize);

    return requests;
  }

  async getCreatedRequestsByUser(userId, pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);

    const requests = await _requestRecord
      .find({ user: userId })
      .populate("request")
      .populate("user")
      .skip(skips)
      .limit(pageSize);

    return requests;
  }

  async getRequestStatus(recordId) {
    const history = await _requestHistory
      .findOne({
        status: StatusHelper.APPROVE_PENDING,
        requestRecord: recordId
      })
      .populate({
        path: "requestStep",
        populate: {
          path: "step",
          model: "Step"
        }
      });

    const {
      requestStep: { step }
    } = history;

    return {
      status: step.name
    };
  }

  async getPendingRequests(reviewerId, pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);

    const requests = await _requestHistory
      .find({
        reviewer: reviewerId,
        completed: false,
        status: StatusHelper.APPROVE_PENDING
      })
      .skip(skips)
      .limit(pageSize);

    return requests;
  }

  async approveRequest(reviewerId, requestHistoryId) {
    const hasPendingApprovement = await _requestHistory
      .findByIdAndUpdate(
        {
          _id: requestHistoryId,
          reviewer: reviewerId
        },
        { completed: true, status: StatusHelper.APPROVED },
        { new: true }
      )
      .populate("requestStep");

    const {
      requestStep: { order: currentOrder },
      requestRecord
    } = hasPendingApprovement;

    let next = await _requestHistory
      .find({ requestRecord })
      .populate("requestStep");

    next = next.find(
      ({ requestStep: { order } }) => order === currentOrder + 1
    );

    next.status = StatusHelper.APPROVE_PENDING;
    await next.save();

    return next;
  }

  async deleteRequestRecord(requestRecordId) {
    const deletedRequestRecord = await _requestRecord.findByIdAndDelete(
      requestRecordId
    );
    await _requestHistory.deleteMany({ requestRecord: requestRecordId });

    return true;
  }
}

module.exports = RequestRepository;

const { RequestService } = require("../../../src/services");
const { RequestRepositoryMock } = require("../../mocks");
const {
  RequestModelMock: { requestType, requestTypes }
} = require("../../mocks");

describe("Request Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should find a role by id", async () => {
    const RequestRepository = RequestRepositoryMock;
    RequestRepository.get.mockReturnValue(requestType);

    const _requestService = new RequestService({ RequestRepository });
    const expected = await _requestService.getRequest(requestType._id);
    expect(expected).toMatchObject(requestType);
  });

  it("Should find a role by id", async () => {
    const RequestRepository = RequestRepositoryMock;
    RequestRepository.getRequestByName.mockReturnValue(requestType);

    const _requestService = new RequestService({ RequestRepository });
    const expected = await _requestService.getRequestByName(requestType._id);
    expect(expected).toMatchObject(requestType);
  });

  it("Should return a role collection", async () => {
    const RequestRepository = RequestRepositoryMock;
    RequestRepository.getAll.mockReturnValue(requestTypes);

    const _requestService = new RequestService({ RequestRepository });
    const expected = await _requestService.getAllRequests();
    expect(expected).toMatchObject(requestTypes);
  });

  it("Should create a role", async () => {
    const RequestRepository = RequestRepositoryMock;
    RequestRepository.create.mockReturnValue(requestType);

    const _requestService = new RequestService({ RequestRepository });
    const expected = await _requestService.createRequest(requestType);
    expect(expected).toMatchObject(requestType);
  });

  it("Should update a role by id", async () => {
    const RequestRepository = RequestRepositoryMock;
    RequestRepository.update.mockReturnValue(requestType);

    const _requestService = new RequestService({ RequestRepository });
    const expected = await _requestService.updateRequest(
      requestType._id,
      requestType
    );
    expect(expected).toMatchObject(requestType);
  });

  it("Should delete a role by id", async () => {
    const RequestRepository = RequestRepositoryMock;
    RequestRepository.update.mockReturnValue(requestType);

    const _requestService = new RequestService({ RequestRepository });
    const expected = await _requestService.updateRequest(requestType._id);
    expect(expected).toMatchObject(requestType);
  });
});

const { RequestRepository } = require("../../../src/repositories");
const mockingoose = require("mockingoose").default;
const { RequestType } = require("../../../src/models");
const {
  RequestModelMock: { requestType, requestTypes }
} = require("../../mocks");

describe("Request Repository", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("Should find a request by id", async () => {
    mockingoose(RequestType).toReturn(requestType, "findOne");

    const _requestRepository = new RequestRepository({ RequestType });
    const expected = await _requestRepository.get(requestType._id);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(requestType);
  });

  it("Should return a request by its name", async () => {
    mockingoose(RequestType).toReturn(requestType, "findOne");
    const _requestRepository = new RequestRepository({ RequestType });
    const expected = await _requestRepository.getRequestByName(
      requestType.name
    );

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(requestType);
  });

  it("Should create a new request", async () => {
    mockingoose(RequestType).toReturn(requestType, "create");
    const _requestRepository = new RequestRepository({ RequestType });
    const expected = await _requestRepository.create(requestType);

    expect(JSON.parse(JSON.stringify(expected[0]))).toMatchObject(requestType);
  });

  it("Should return a request collection", async () => {
    mockingoose(RequestType).toReturn(requestTypes, "find");

    const _requestRepository = new RequestRepository({ RequestType });
    const expected = await _requestRepository.getAll();

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(requestTypes);
  });

  it("Should update an especific request by id", async () => {
    mockingoose(RequestType).toReturn(requestType, "findOneAndUpdate");

    const _requestRepository = new RequestRepository({ RequestType });
    const expected = await _requestRepository.update(requestType._id, {
      name: "Calification Revision Request"
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(requestType);
  });

  it("Should delete an especific request by id", async () => {
    mockingoose(RequestType).toReturn(requestType, "findOneAndDelete");
    const _requestRepository = new RequestRepository({ RequestType });
    const expected = await _requestRepository.delete(requestType._id);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(requestType);
  });
});

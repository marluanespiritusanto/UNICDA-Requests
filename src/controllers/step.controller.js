let _stepService = null;

class StepController {
  constructor({ StepService }) {
    _stepService = StepService;
  }

  async getStep(req, res) {
    const { id } = req.params;
    const step = await _stepService.getStep(id);
    return res.send(step);
  }

  async getAllSteps(req, res) {
    const { pageSize, pageNum } = req.query;

    const steps = await _stepService.getAllSteps(
      parseInt(pageSize),
      parseInt(pageNum)
    );
    return res.send(steps);
  }

  async createStep(req, res) {
    const { body } = req;
    const createdStep = await _stepService.createStep(body);
    return res.status(201).send(createdStep);
  }

  async updateStep(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedStep = await _stepService.updateStep(id, body);
    return res.send(updatedStep);
  }

  async deleteStep(req, res) {
    const { id } = req.params;
    const deletedUser = await _stepService.deleteStep(id);
    return res.send(deletedUser);
  }
}

module.exports = StepController;
const { StatusHelper } = require("../helpers");

let _step = null;

class StepRepository {
  constructor({ Step }) {
    _step = Step;
  }
  async get(id) {
    const step = await _step.findOne({ _id: id, status: StatusHelper.ACTIVE });
    return step;
  }

  async getStepByName(name) {
    const step = await _step.findOne({ name, status: StatusHelper.ACTIVE });
    return step;
  }

  async getAll(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);

    const steps = await _step
      .find({ status: StatusHelper.ACTIVE })
      .skip(skips)
      .limit(pageSize);

    return steps;
  }

  async create(step) {
    const createdStep = await _step.create([step]);
    return createdStep;
  }

  async update(id, step) {
    const updatedStep = await _step.findByIdAndUpdate({ _id: id }, step, {
      new: true
    });

    return updatedStep;
  }

  async delete(id) {
    const deletedStep = await _step.findByIdAndDelete(id);
    return deletedStep.toJSON();
  }
}

module.exports = StepRepository;

const server = require("./server");
const { PORT, MONGO_URI } = require("./config");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log("Application running on port " + PORT);
    });
  })
  .catch(console.log);

const server = require("./server");
const { PORT } = require("./config");

server.listen(PORT, () => {
  console.log("Application running on port " + PORT);
});

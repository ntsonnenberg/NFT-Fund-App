require("dotenv/config");

const app = require("./server");

//const port = process.env.PORT || 3001;

const port = process.env.NODE_PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

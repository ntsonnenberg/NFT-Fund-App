require("dotenv").config({ path: __dirname + "/.env" });

const app = require("./server");

//const port = process.env.PORT || 3001;

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

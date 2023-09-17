const express = require("express");
const cors=require("cors");
// const env = require("dotenv");
const dataroutes = require("./routes/datasendroute");

const server = express();
const port = process.env.PORT || 3000;

// env.config();
server.use(cors());
server.use(express.json());
server.use("/send-request",dataroutes.routes);




server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

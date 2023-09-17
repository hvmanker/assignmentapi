const datacont = require("../controller/datasend")
const express = require("express");

const router = express.Router();    
router
.post("/", datacont.ret);

exports.routes=router;
  
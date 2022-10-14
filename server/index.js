require("dotenv").config();
const express = require('express')
const app = express()
const path = require("path");

console.log(process.env.GITTOKEN)
app.use(express.static(path.join(__dirname, "../client/dist")))
app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
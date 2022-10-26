require("dotenv").config();
const express = require('express')
const app = express()
const path = require("path");
const serveStatic = require('serve-static')

// app.use(express.json());
// app.get("/", (req, res) => {
//   req.url = req.url + ".gz";
//   res.set("Content-Encoding", "gzip");
//   res.set("Content-Type", "text/javascript");
// })

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.join(__dirname, "../client/dist")))


// function setDataFilesHeaders(res) {
//   res.Headers.Remove("Content-Encoding");
//   res.AppendHeader("Content-Encoding", "gzip");
//   res.setHeader("Content-Type", "text/javascript");
// res.setHeader("Content-Encoding", "gzip");
// res.setHeader("Content-Disposition", "gzip");
// }

// app.use(serveStatic(path.join(__dirname, "../client/dist"), { setHeaders: setDataFilesHeaders }));








app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
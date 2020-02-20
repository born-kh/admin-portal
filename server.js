const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function(req, res) {
  return res.send('pong');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

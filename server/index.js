const express = require('express');
const app = express();
const controller = require('./controller');

app.use(express.static('client'));


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
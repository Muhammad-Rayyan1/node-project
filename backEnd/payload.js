const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Route to receive a payload in the request body
app.post('/api/receive-payload', (req, res) => {
  const receivedPayload = req.body;
  console.log('Received Payload:', receivedPayload);
  res.json({ message: 'Payload received successfully' });
});

// Route to send a payload in the response
app.get('/api/send-payload', (req, res) => {
  const sentPayload = { key: 'value', number: 42 };
  res.json(sentPayload);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

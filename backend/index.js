const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let validCodes = ['CORRECT_CODE']; // Replace this with your logic to manage codes
let users = {}; // Stores users and their points for simplicity

// Endpoint to validate the code
app.post('/api/validate-code', (req, res) => {
  const { code } = req.body;

  if (validCodes.includes(code)) {
    res.json({ success: true, points: 10 });
  } else {
    res.json({ success: false });
  }
});

// Serve static files from frontend
app.use(express.static('../frontend/dist'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


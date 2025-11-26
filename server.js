const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/token', async (req, res) => {
  const ret = await fetch(
    "https://developer.api.autodesk.com/authentication/v2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "client_id=" +
        process.env.APS_CLIENT_ID +
        "&client_secret=" +
        process.env.APS_CLIENT_SECRET +
        "&grant_type=client_credentials&scope=viewables:read",
    }
  );
  const oauth = await ret.json();
  res.json(oauth);
});

app.get('/urn', async (req, res) => {
  res.json({ urn: process.env.APS_URN });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

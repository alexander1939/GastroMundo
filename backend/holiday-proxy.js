import express from "express";
import axios from "axios";

const app = express();
const PORT = 3001;

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/api/holidays", async (req, res) => {
  const { year, month } = req.query;

  try {
    const response = await axios.get("https://holidayapi.com/v1/holidays", {
      params: {
        key: "98da9d8a-7952-48e9-9d57-34965fcf340b",
        country: "MX",
        year,
        month,
        language: "es",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching holidays" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}`);
});

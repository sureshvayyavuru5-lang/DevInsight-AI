const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// Check GitHub Token
console.log(
  "GitHub Token Loaded:",
  process.env.GITHUB_TOKEN ? "YES ✅" : "NO ❌"
);


// Home Route
app.get("/", (req, res) => {
  res.send("🚀 DevInsight AI Backend is Running...");
});


// GitHub Profile API
app.get("/github/:username", async (req, res) => {
  try {
    const username = req.params.username;

    console.log("Searching GitHub User:", username);

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(
      "GitHub API Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "GitHub API failed",
      error: error.response?.data || error.message,
    });
  }
});


// GitHub Repositories API
app.get("/repos/:username", async (req, res) => {
  try {
    const username = req.params.username;

    console.log("Fetching Repositories:", username);

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(
      "Repository API Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "GitHub Repository API failed",
      error: error.response?.data || error.message,
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
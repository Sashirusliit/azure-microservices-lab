const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Gateway Service Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/appointments", (req, res) => {
  res.json([
    { id: 1, patient: "John", date: "2026-04-01" },
    { id: 2, patient: "Sara", date: "2026-04-02" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
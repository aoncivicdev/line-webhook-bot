const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const events = req.body.events;
  if (events && events.length > 0) {
    const userId = events[0].source.userId;
    const message = events[0].message?.text || "ไม่ใช่ข้อความ";
    console.log("📌 userId:", userId);
    console.log("💬 message:", message);
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("✨ LINE Webhook พร้อมใช้งานแล้วค่ะ");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});

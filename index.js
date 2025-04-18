const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const CHANNEL_ACCESS_TOKEN = 'ใส่ Access Token ที่นี่';

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  for (let event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;
      const userId = event.source.userId;

      console.log("📍 userId:", userId); // ✅ ดูใน Render log ได้ด้วย

      await axios.post('https://api.line.me/v2/bot/message/reply', {
        replyToken: replyToken,
        messages: [
          { type: 'text', text: `userId ของคุณคือ:\n${userId}` }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        }
      });
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("LINE Webhook ของอ้นพร้อมแล้วจ้า!");
});

app.listen(3000, () => {
  console.log("Bot is running on port 3000");
});

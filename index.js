const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ✅ TOKEN ใหม่ที่คุณอ้นให้มา
const CHANNEL_ACCESS_TOKEN = 'fO+NpZFpWc5mb3j3zfg+QJNM5G7yY9KpDOCiOXbYVwLVGG0qxhTrFUsNLfWnZC4ZjC5d5GqxGGDETFMgeHv67jMZywVHag0HJrr5XoRgYb9pxmFNFYPK09Qaj4JK067jUyxU8seCYfOltGPPuE0n2gdB04t89/1O/w1cDnyilFU=';

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  for (let event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;
      const userId = event.source.userId;

      // ✅ แสดง userId และข้อความ
      console.log("📌 userId:", userId);
      console.log("💬 ข้อความ:", userMessage);

      await axios.post('https://api.line.me/v2/bot/message/reply', {
        replyToken: replyToken,
        messages: [
          { type: 'text', text: `อ้นส่งว่า: ${userMessage}` }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        }
      });
    }
  }

  res.sendStatus(200); // สำคัญ!
});

app.get("/", (req, res) => {
  res.send("🚀 LINE Webhook ของอ้นพร้อมแล้วจ้า!");
});

app.listen(3000, () => {
  console.log("✅ Bot is running on port 3000");
});

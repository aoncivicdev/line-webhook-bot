const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const CHANNEL_ACCESS_TOKEN = 'mRM+nUUj2IfuheBpe/iFiATgJYHwkKO3nBgrAEi1RRWbhZfZNAZ9saz8iKmO9S1JjC5d5GqxGGDETFMgeHv67jMZywVHag0HJrr5XoRgYb/M3MwCF3ki4wRSd/iYa7tEKLQp1ohDJJKC84K3SVOKUAdB04t89/1O/w1cDnyilFU=';

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  for (let event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

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

  res.sendStatus(200); // ✅ สำคัญมาก! ต้องมี response 200
});

app.get("/", (req, res) => {
  res.send("LINE Webhook ของอ้นพร้อมแล้วจ้า!");
});

app.listen(3000, () => {
  console.log("Bot is running on port 3000");
});

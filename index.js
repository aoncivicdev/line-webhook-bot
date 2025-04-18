const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const CHANNEL_ACCESS_TOKEN = '9SL0rceqGxMvV3pyd+Dm3y0uIGHARXyHOHx4oh3/zP5wwq4z79od4FmVHCnJ6XnVjC5d5GqxGGDETFMgeHv67jMZywVHag0HJrr5XoRgYb+dhz0FK84ZMslBRUbhAzizhHufFvhiYZCuAgCU49uzAQdB04t89/1O/w1cDnyilFU=';

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

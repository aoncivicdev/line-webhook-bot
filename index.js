app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  for (let event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;
      const userId = event.source.userId; // ✅ เก็บ userId

      // ส่งข้อความตอบกลับพร้อม userId ไปเลย
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

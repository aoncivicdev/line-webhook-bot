const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const LINE_TOKEN = "fO+NpZFpWc5mb3j3zfg+QJNM5G7yY9KpDOCiOXbYVwLVGG0qxhTrFUsNLfWnZC4ZjC5d5GqxGGDETFMgeHv67jMZywVHag0HJrr5XoRgYb9pxmFNFYPK09Qaj4JK067jUyxU8seCYfOltGPPuE0n2gdB04t89/1O/w1cDnyilFU=";

app.post("/webhook", async (req, res) => {
  try {
    const events = req.body.events;
    if (events && events.length > 0) {
      const userId = events[0].source.userId;
      const msg = events[0].message?.text || "ไม่มีข้อความ";
      console.log("📌 userId:", userId);
      console.log("💬 message:", msg);

      // ตอบกลับแบบ push
      await axios.post(
        "https://api.line.me/v2/bot/message/push",
        {
          to: userId,
          messages: [
            { type: "text", text: `คุณพิมพ์ว่า: ${msg}` }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${LINE_TOKEN}`
          }
        }
      );

      console.log("✅ ตอบกลับสำเร็จ!");
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ ตอบกลับล้มเหลว:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("✅ LINE Webhook พร้อมใช้งานแล้วค่ะ");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("🚀 Bot is running on port", port);
});

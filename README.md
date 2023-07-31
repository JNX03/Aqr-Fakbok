<h1 align="center">Aqr-ฝากบอก</h1>

---
#### บอทดิสคอสสำหรับการทำ ฝากบอก - open source

## Installation
```dust
npm install discord.js@13.1.0
```
### Setting

- Change the line that having comment 
- Enter You discord bot token and Your Webhook url here
```javascript
const webhookUrl = 'webhook'; //webhook ของห้องที่ต้องการให้บอทส่งข้อความ

const token = 'Token'; //Token ของบอทดิสคอสคุณ
```
- Enter you allow channel (ID) here
```javascript
const allowedChannel = 'ChannelId'; //Id ของห้องที่คุณสามารถให้ใช้คำสั่งได้
```
- Change you embed style here
```javascript
        const embed = {
          title: `ฝากบอก`, //Title ของ webhook
          color: `#${randomColor}`,
          description: text,
          image: { url: image },
          footer: { text: type === 'open' ? `บอกโดย : ${interaction.user.tag}` : 'ปิดหมด!' } 
        };

        const webhookClient = new WebhookClient({ url: webhookUrl });

        webhookClient.send({
          username: 'ชื่อ webhook', //ชื่อของ webhook
          avatarURL: 'avatar ของ webhook', //Icon ของ webhook
          embeds: [embed]
        });
```

### Run the bot
```dust
node index.js
```

Using on Aquarius project Create by Jnx03 - Please give me a credit


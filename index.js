const { Client, Intents, WebhookClient } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const webhookUrl = 'webhook'; //webhook ของห้องที่ต้องการให้บอทส่งข้อความ

const token = 'Token'; //Token ของบอทดิสคอสคุณ

let restart = false;

const allowedChannel = 'ChannelId'; //Id ของห้องที่คุณสามารถให้ใช้คำสั่งได้
const keep_alive = require('./keep_alive.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.application.commands.create({
    name: 'ฝากบอก',
    description: 'ใส่ข้อความที่คุณอยากจะบอก', 
    options: [
      {
        name: 'text',
        description: 'ใส่ข้อความที่คุณอยากจะบอก',
        type: 'STRING',
        required: true
      },
      {
        name: 'type',
        description: 'เลือกประเภทการบอก เปิด คือ จะบอกว่าคุณคือใคร - ปิด คือ ไม่บอกว่าคุณคือใคร',
        type: 'STRING',
        required: true,
        choices: [
          { name: 'เปิด', value: 'open' },
          { name: 'ปิด', value: 'closed' } 
        ]
      },
      { 
        name: 'image',
        description: 'ใส่ลิ้งค์รูปภาพ (ตัวเลือก)',
        type: 'STRING'
      }
    ]
  });

});

client.on('interactionCreate', async interaction => {

  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ฝากบอก') {

    if(interaction.channelId !== allowedChannel) {
      return interaction.reply({content: 'กรุณาใช้คําสั่งให้ถูกห้องด้วยคับ🪐', ephemeral: true});
    }
    
    const text = interaction.options.getString('text');
    const image = interaction.options.getString('image');
    const type = interaction.options.getString('type');

    console.log(`${interaction.user.tag} used ฝากบอก command with text: ${text}`);

    await interaction.reply({
      content: '```\nงดใช้คําหยาบคาย\nไม่กล่าวถึงคนอื่นในแง่ลบ\nไม่พูดเรื่อง 18+\n```\nต้องการส่งข้อความนี้ใช่หรือไม่?',
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'ยกเลิก',
              style: 4,
              custom_id: 'cancel'
            },
            {
              type: 2,
              label: 'ตกลง',
              style: 3,
              custom_id: 'confirm'
            }
          ]
        }
      ]
    });

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'cancel') {
        await i.update({ content: 'ยกเลิกการส่งข้อความ', components: [] });
      } else if (i.customId === 'confirm') {

        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const timestamp = Date.now();

        const embed = {
          title: `title`, //Title ของ webhook
          color: `#${randomColor}`,
          description: text,
          image: { url: image },
          footer: { text: type === 'open' ? `บอกโดย : ${interaction.user.tag}` : 'ปิดหมด!' } 
        };

        const webhookClient = new WebhookClient({ url: webhookUrl });

        webhookClient.send({
          username: 'webhook name', //ชื่อของ webhook
          avatarURL: 'image url', //Icon ของ webhook
          embeds: [embed]
        });

        console.log(`Embed sent for ${interaction.user.tag} with text: ${text}`);

        await i.update({ content: 'ส่งข้อความเรียบร้อย!', components: [] });
      }
    });

    collector.on('end', collected => {
      if (!collected.size) {
        interaction.editReply({ content: 'เวลาหมดแล้ว', components: [] });
      } 
    });

  }

});

process.on('uncaughtException', () => {
  restart = true;
}); 

process.on('SIGINT', () => {
  restart = true; 
});

process.on('exit', () => {
  if(restart) {
    require('child_process').spawn(process.argv.shift(), process.argv, {
      cwd: process.cwd(),
      detached: true,
      stdio: 'inherit'
    });
  }
});

client.login(token);
//Using on Aquarius project Create by Jn03 (Jean_netis)

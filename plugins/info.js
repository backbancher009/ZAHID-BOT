const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad Nayan',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },
  start: async ({ event, api, message }) => {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `${i + 1}. @${id.split('@')[0]}`)
              .join('\n')
          : 'No admins found.';

      const infoMessage = `
--------------------------------------------
╔═══❖•ೋ°°ೋ•❖═══╗
🫣 *𝐙.𝐓ᴀʟᴜᴋᴅᴀʀ.. ⚡*
╚═══❖•ೋ°°ೋ•❖═══╝

🌸 *𝐍ᴀᴍᴇ:* *𝐙.𝐓ᴀʟᴜᴋᴅᴀʀ.. ⚡*
💫 *𝐅ᴀᴄᴇʙᴏᴏᴋ:* *Zahid Talukdar*
🕌 *𝐑ᴇʟɪɢɪᴏɴ:* 𝐈sʟᴀᴍ
🏠 *𝐀ᴅᴅʀᴇss:* 𝐂ᴏᴍɪʟʟᴀ, 𝐁ᴀɴɢʟᴀᴅᴇsʜ
👑 *𝐆ᴇɴᴅᴇʀ:* 𝐌ᴀʟᴇ
🎂 *𝐀ɢᴇ:* 𝟏𝟖+
💝 *𝐑ᴇʟᴀᴛɪᴏɴsʜɪᴘ:* 𝐌ɪɴɢʟᴇ
📚 *𝐖ᴏʀᴋ:* 𝐒ᴛᴜᴅᴇɴᴛ

--------------------------------------------
\`\`\`
🖥️ Server Info:
• Platform       : ${os.platform()}
• CPU            : ${os.cpus()[0].model}
• Node.js Version: ${process.version}
• Uptime         : ${uptime}
• Total Memory   : ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
• Free Memory    : ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
\`\`\``;

      await api.sendMessage(
            event.threadId,
            { image: { url: "https://i.ibb.co.com/BHvWrzG2/1768616020605.png" }, caption: infoMessage || '' },
            { quoted: event.message }
          );;
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching info.', { quoted: event.message });
    }
  },
};

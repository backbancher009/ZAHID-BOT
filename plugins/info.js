const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: true,
    category: 'Utilities', // ✅ fixed
    credit: 'XAHID PRIME 🍷',
    usages: [`${global.config.PREFIX}info`],
  },

  start: async ({ event, api }) => {
    try {
      const { threadId, message } = event;

      // ⏱️ uptime
      const uptime = new Date(process.uptime() * 1000)
        .toISOString()
        .substr(11, 8);

      // 👑 admin list fix
      const admins = global.config.admin || [];

      let adminText = "❌ No admins found";
      let mentions = [];

      if (admins.length > 0) {
        adminText = "";
        admins.forEach((id, i) => {
          const jid = id.includes("@") ? id : id + "@s.whatsapp.net";
          mentions.push(jid);
          adminText += `👑 ${i + 1}. @${jid.split("@")[0]}\n`;
        });
      }

      // 💎 premium message
      const infoMessage = `
╔══════════════════════╗
   👑 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗜𝗡𝗙𝗢 👑
╚══════════════════════╝

🧑‍💻 𝐏𝐑𝐎𝐅𝐈𝐋𝐄
━━━━━━━━━━━━━━━━━━━
👤 𝐍𝐚𝐦𝐞        : ${global.config.botOwner || "Unknown"}
📍 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧      : 𝐂𝐨𝐦𝐢𝐥𝐥𝐚, 𝐇𝐨𝐦𝐧𝐚 
📚 𝐏𝐫𝐨𝐟𝐞𝐬𝐬𝐢𝐨𝐧     : 𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬 🎐
❤️ 𝐒𝐭𝐚𝐭𝐮𝐬        : 𝐒𝐢𝐧𝐠𝐥𝐞 😖

📞 𝐂𝐎𝐍𝐓𝐀𝐂𝐓
━━━━━━━━━━━━━━━━━━━
📱 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 : wa.me/${admins[0] || "8801838569277"}

🤖 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎
━━━━━━━━━━━━━━━━━━━
⚙️ 𝐍𝐚𝐦𝐞     : ${global.config.botName || "Bot"}
📌 𝐏𝐫𝐞𝐟𝐢𝐱     : ${global.config.PREFIX || "/"}
🚀 𝐕𝐞𝐫𝐬𝐢𝐨𝐧    : ${global.pkg?.version || "1.0.0"}

👑 𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍𝐒
━━━━━━━━━━━━━━━━━━━
${adminText}
━━━━━━━━━━━━━━━━━━━
⚡ 𝐒𝐓𝐀𝐓𝐔𝐒 : 𝐎𝐍𝐋𝐈𝐍𝐄 🟢
💎 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 🍷
`;

      // 📤 send
      await api.sendMessage(
        threadId,
        {
          image: {
            url: "https://i.postimg.cc/vH38QPvm/20260408-091853.jpg"
          },
          caption: infoMessage,
          mentions: mentions
        },
        { quoted: message }
      );

    } catch (error) {
      console.error("INFO ERROR:", error);

      await api.sendMessage(
        event.threadId,
        { text: "❌ 𝐈𝐧𝐟𝐨 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐞𝐫𝐫𝐨𝐫!" },
        { quoted: event.message }
      );
    }
  },
};

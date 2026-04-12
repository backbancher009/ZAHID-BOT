const axios = require("axios");

module.exports = {
  config: {
    name: "menu",
    aliases: ["help"],
    permission: 0,
    prefix: true,
    description: "Premium Command Menu",
    category: "Utility",
    credit: "XAHID PRIME 🍷"
  },

  start: async ({ event, api, loadcmd }) => {
    const { threadId } = event;

    const commands = loadcmd.map(cmd => cmd.config);

    // 🧠 Group commands by category
    const categories = {};
    commands.forEach(cmd => {
      const cat = cmd.category || cmd.categorie || cmd.categories || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.name);
    });

    // 🕒 Time & Date
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour12: true });
    const date = now.toLocaleDateString("en-US");

    // 📊 Total commands
    const total = commands.length;

    // 💎 Header
    let text = `
╔══════════════════════╗
   🚀 ${global.config.botName || "𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌"} 🚀
╚══════════════════════╝

👑 𝐎𝐰𝐧𝐞𝐫   : ${global.config.botOwner || "𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓"}
🤖 𝐁𝐨𝐭     : ${global.config.botName || "𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓"}
🌐 𝐏𝐫𝐞𝐟𝐢𝐱  : ${global.config.PREFIX}
⚡ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : ${global.pkg?.version || "1.0.0"}

⏰ 𝐓𝐢𝐦𝐞    : ${time}
📅 𝐃𝐚𝐭𝐞    : ${date}

━━━━━━━━━━━━━━━━━━━━━━━
📦 𝐓𝐎𝐓𝐀𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ➜ ${total}
━━━━━━━━━━━━━━━━━━━━━━━
`;

    // 📂 Categories loop
    for (const cat in categories) {
      text += `\n╭─〔 ${cat} 〕\n`;

      categories[cat].forEach(cmd => {
        text += `│ ✧ ${global.config.PREFIX}${cmd}\n`;
      });

      text += `╰───────────────╯\n`;
    }

    // 🔻 Footer
    text += `
━━━━━━━━━━━━━━━━━━━━━━━
⚡ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒: 𝐎𝐍𝐋𝐈𝐍𝐄
💀 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 ${global.config.botName || "𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓"} 🍷
━━━━━━━━━━━━━━━━━━━━━━━
`;

    // 📤 Send
    try {
      const res = await axios.get(global.config.helpPic, {
        responseType: "stream"
      });

      await api.sendMessage(threadId, {
        image: { stream: res.data },
        caption: text
      });

    } catch {
      await api.sendMessage(threadId, { text });
    }
  }
};

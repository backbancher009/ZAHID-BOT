const axios = require("axios");

module.exports = {
  config: {
    name: 'help',
    aliases: ['menu'],
    permission: 0,
    prefix: true,
    description: 'Show all available commands.',
    category: 'Utility',
    credit: '𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 🍷',
    usages: ['help', 'help [command name]'],
  },

  start: async ({ event, api, args, loadcmd }) => {
    const { threadId, getPrefix } = event;

    const commands = loadcmd.map(cmd => cmd.config);
    const prefix = await getPrefix(threadId);
    const globalPrefix = global.config.PREFIX;

    // 🔍 SINGLE COMMAND INFO
    if (args[0]) {
      const cmd = commands.find(c => c.name.toLowerCase() === args[0].toLowerCase());

      if (!cmd) {
        return api.sendMessage(threadId, { text: "❌ Command not found" });
      }

      return api.sendMessage(threadId, {
        text: `
✨ ${cmd.name}

• Aliases: ${cmd.aliases?.join(", ") || "None"}
• Description: ${cmd.description || "No description"}
• Usage: ${cmd.usages?.join(" , ") || "N/A"}
• Permission: ${cmd.permission}
• Category: ${cmd.category || "Other"}
• Credit: ${cmd.credit || "Unknown"}
`
      });
    }

    // 📂 CATEGORY BUILD
    const categories = {};
    commands.forEach(cmd => {
      const cat = cmd.category || cmd.categorie || cmd.categories || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.name);
    });

    // 🕒 TIME
    const timezone = global.config.timeZone || "Asia/Dhaka";

    const currentTime = new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const currentDate = new Date().toLocaleDateString("en-US", {
      timeZone: timezone
    });

    // 🚀 HEADER
    let text = `
✨ ${global.config.botName}

👑 Owner: ${global.config.botOwner}
🌐 Prefix: ${prefix || globalPrefix}

🕒 ${currentTime} • ${currentDate}
📊 Total Commands: ${commands.length}

`;

    // 📜 COMMAND LIST
    for (const cat in categories) {
      text += `\n${cat}\n`;
      text += categories[cat].map(cmd => `• ${prefix}${cmd}`).join("\n");
      text += `\n`;
    }

    text += `\n💎 Type ${prefix}help <command> for details`;

    // 📤 SEND
    try {
      const res = await axios.get(global.config.helpPic, { responseType: 'stream' });

      await api.sendMessage(threadId, {
        image: { stream: res.data },
        caption: text
      });

    } catch {
      await api.sendMessage(threadId, { text });
    }
  }
};

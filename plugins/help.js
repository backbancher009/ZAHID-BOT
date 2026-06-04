const axios = require("axios");

module.exports = {

  config: {

    name: 'help',

    aliases: ['menu'],

    permission: 0,

    prefix: true,

    description: 'Show all available commands.',

    category: 'Utility',

    credit: 'Developed by Mohammad Nayan',

    usages: ['help', 'help [command name]'],

  },

  start: async ({ event, api, args, loadcmd }) => {

    const { threadId, getPrefix } = event;

    const getAllCommands = () => loadcmd.map((plugin) => plugin.config);

    const commands = getAllCommands();

    const prefix = await getPrefix(threadId)

    const globalPrefix = global.config.PREFIX;

    const mergedCategories = {

      "⚙️ System": ["Administration", "Admin", "Owner", "Bot Management", "System"],

      "🧠 AI & Chat": ["AI", "AI Chat"],

      "🎬 Media": ["Media", "Video", "Image"],

      "🧰 Utilities": ["Utility", "Utilities", "System"],

      "👥 Group": ["Group Management", "group"],

      "🎮 Fun": ["Fun", "Games", "greetings"],

      "🛰️ Tools": ["Tools", "Information"]

    };

    const categories = {};

    commands.forEach((cmd) => {

      let cat = cmd.category || cmd.categorie || cmd.categories || "📦 Uncategorized";

      for (const merged in mergedCategories) {

        if (mergedCategories[merged].includes(cat)) {

          cat = merged;

          break;

        }

      }

      if (!categories[cat]) categories[cat] = [];

      categories[cat].push(cmd);

    });

    // ───── SINGLE COMMAND INFO ─────

    if (args[0]) {

      const command = commands.find((cmd) => cmd.name.toLowerCase() === args[0].toLowerCase());

      if (command) {

        const infoText = `

╭─❖  𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢  ❖─╮

│ 🔹 Name: ${command.name}

│ 🔹 Aliases: ${command.aliases?.join(", ") || "None"}

│ 🔹 Version: ${command.version || "1.0.0"}

│ 🔹 Description: ${command.description || "No description"}

│ 🔹 Usage: ${command.usage || command.usages?.join("\n│   ") || "Not defined"}

│ 🔹 Permission: ${command.permission}

│ 🔹 Category: ${command.category || "Uncategorized"}

│ 🔹 Credits: ${command.credit || command.credits || "Mohammad Nayan"}

╰────────────────────╯`;

        await api.sendMessage(threadId, { text: infoText });

      } else {

        await api.sendMessage(threadId, { text: `⚠️ No command found named "${args[0]}".` });

      }

      return;

    }

    const pkg = global.pkg;

    const timezone = global.config.timeZone || "Asia/Dhaka";

    const now = new Date().toLocaleString("en-US", {

      timeZone: timezone,

      hour12: true,

    });

    const currentTime = new Date().toLocaleTimeString("en-US", {

      timeZone: timezone,

      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",

      hour12: true

    });

    const currentDate = new Date().toLocaleDateString("en-US", {

      timeZone: timezone,

      day: "2-digit",

      month: "2-digit",

      year: "numeric"

    });

    // ───── MAIN HELP MENU ─────

    let responseText = `
   ✧ 💖 *ʜᴇʟʟᴏ,* 💖 ✧
╭─────────────────┈⊷

│ ⎯͢✧ 𝐁𝐨𝐓: ${global.config.botName || "Shahin Rana"}

┊ ⎯͢✧𝐎𝐰𝐧𝐞𝐑: ${global.config.botOwner || "Mr Rana"}

┊ ⎯͢✧𝐆𝐥𝐨𝐛𝐚𝐋 𝐩𝐫𝐞𝐟𝐢𝐗: \`${globalPrefix}\`

┊🪄⎯͢✧ 𝐆𝐫𝐨𝐮𝐩 𝐩𝐫𝐞𝐟𝐢𝐗: \`${prefix || "Not set (using global)"}\`

┊ ⎯͢✧ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${pkg.version}

┊ ⎯͢✧ 𝐓𝐢𝐌𝐄: ${currentTime}

┊ ⎯͢✧ 𝐃𝐚𝐭𝐄: ${currentDate}

┊ ⎯͢✧ 𝐓𝐢𝐦𝐄𝐙𝐨𝐧𝐞:* ${timezone}

┊ ⎯͢✧ 𝐓𝐨𝐭𝐚𝐋 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${commands.length}
╰─────────────────┈⊷`;




// Fancy Font Function

function fancyText(text) {

  const map = {

    a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",

    h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",

    o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",

    v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳",

    A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",

    H:"𝐇",I:"𝐈",J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",N:"𝐍",

    O:"𝐎",P:"𝐏",Q:"𝐐",R:"𝐑",S:"𝐒",T:"𝐓",U:"𝐔",

    V:"𝐕",W:"𝐖",X:"𝐗",Y:"𝐘",Z:"𝐙"

  };

  return text.split("").map(x => map[x] || x).join("");

}

for (const category in categories) {

    const cmds = categories[category]

        .map(cmd => `┃ *▢ ${prefix}${fancyText(cmd.name)}*`)

        .join("\n");

    responseText += `

*❲ ❲ ${category} ❳ ❳ ⬩*

╭⊷

${cmds}

╰⊷`;

}

responseText += `

⎯͢✧🌷 𝐗-𝐒ʜꫝʜɪɴ 𝐑ᴀɴꫝᥫ᭡`;
    





    try {

      const response = await axios.get(global.config.helpPic, { responseType: 'stream' });

      await api.sendMessage(threadId, {

        image: { stream: response.data },

        caption: responseText

      });

    } catch {

      await api.sendMessage(threadId, { text: responseText });

    }

  },

};    

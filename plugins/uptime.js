const os = require("os");

module.exports = {

  config: {

    name: "uptime",

    aliases: ["up"],

    permission: 0,

    prefix: true,

    description: "Check the bot's uptime.",

    categories: "Bot Management",

    credit: "Developed by Mohammad Nayan",

  },

  start: async ({ api, event }) => {

    const { threadId, message } = event;

    const uptimeMs = Date.now() - global.botStartTime;

    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));

    const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);

    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);

    const seconds = Math.floor((uptimeMs / 1000) % 60);

    const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // 🌟 Random Emoji List

    const emojis = [

      "🌷", "🌹", "🪻", "🌺", "🌼",

      "🦚", "🦋", "🐼", "🦄", "🐬",

      "🌙", "☄️", "🌟", "⭐", "🌈",

      "🍁", "🍂", "🍀", "🎐", "🎀",

      "🎭", "🎨", "🎪", "🎡", "🎠",

      "🧸", "🪁", "🪄", "💠", "🔮",

      "💜", "💙", "🩵", "🤎", "🩶"

    ];

    const randomEmoji =

      emojis[Math.floor(Math.random() * emojis.length)];

    // ❤️ Reaction

    try {

      await api.setMessageReaction(

        randomEmoji,

        message.messageId,

        threadId

      );

    } catch (e) {}

    // 💬 Output

    const msg = `*⎯͢✧𝐔ᴘᴛɪᴍᴇ${randomEmoji}ᥫ᭡:* ${uptime}`;

    await api.sendMessage(

      threadId,

      { text: msg },

      { quoted: message }

    );

  }

};

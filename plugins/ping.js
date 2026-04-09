module.exports = {
  config: {
    name: 'ping',
    aliases: ['p'],
    permission: 0,
    prefix: 'both',
    categories: 'system',
    description: 'Check bot response time',
    usages: ['ping', 'p'],
    credit: 'XAHID PRIME 🍷'
  },

  start: async ({ event, api }) => {
    const { threadId } = event;

    const start = Date.now();

    const msg = await api.sendMessage(threadId, {
      text: "⚡ 𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴..."
    });

    const end = Date.now();
    const ping = end - start;

    const responses = [
      "🏓 𝗣𝗼𝗻𝗴!",
      "⚡ 𝗢𝗻𝗹𝗶𝗻𝗲!",
      "🚀 𝗥𝘂𝗻𝗻𝗶𝗻𝗴!",
      "✅ 𝗔𝗰𝘁𝗶𝘃𝗲!"
    ];

    const reply = responses[Math.floor(Math.random() * responses.length)];

    const finalText = `
${reply}

⏱ 𝗦𝗽𝗲𝗲𝗱: ${ping} 𝗺𝘀
🤖 𝗦𝘁𝗮𝘁𝘂𝘀 : 𝗦𝗺𝗼𝗼𝘁𝗵
`;

    await api.sendMessage(threadId, {
      text: finalText,
      edit: msg.key
    });
  },
};

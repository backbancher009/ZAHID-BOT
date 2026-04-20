const stickerStatus = {};

module.exports = {
  config: {
    name: "antisticker",
    aliases: ["stickerblock"],
    permission: 0,
    prefix: true,
    category: "group"
  },

  start: async ({ event, api, args }) => {
    const { threadId, senderId } = event;

    const meta = await api.groupMetadata(threadId);
    const admins = meta.participants.filter(p => p.admin).map(p => p.id);

    if (!admins.includes(senderId)) {
      return api.sendMessage(threadId, {
        text: "🚫 Only admin can use this!"
      });
    }

    const action = args[0];

    if (action === "on") {
      stickerStatus[threadId] = true;
      return api.sendMessage(threadId, { text: "✅ 𝗦𝘁𝗶𝗰𝗸𝗲𝗿 𝗯𝗹𝗼𝗰𝗸 𝗢𝗡" });
    }

    if (action === "off") {
      stickerStatus[threadId] = false;
      return api.sendMessage(threadId, { text: "🚫 𝗦𝘁𝗶𝗰𝗸𝗲𝗿 𝗯𝗹𝗼𝗰𝗸 𝗢𝗙𝗙" });
    }

    return api.sendMessage(threadId, {
      text: "Use:\n.nosticker on\n.nosticker off"
    });
  },

  event: async ({ event, api }) => {
    const { threadId, senderId, message } = event;

    if (!threadId.endsWith("@g.us")) return;
    if (!stickerStatus[threadId]) return;

    const msg = message?.message;
    if (!msg?.stickerMessage) return;

    // 🛡️ admin skip
    const meta = await api.groupMetadata(threadId);
    const admins = meta.participants.filter(p => p.admin).map(p => p.id);
    if (admins.includes(senderId)) return;

    try {
      // ❌ delete sticker
      await api.sendMessage(threadId, {
        delete: {
          remoteJid: threadId,
          fromMe: false,
          id: message.key.id,
          participant: message.key.participant || senderId
        }
      });

      // ⏳ small delay (important fix)
      setTimeout(async () => {
        await api.sendMessage(threadId, {
          text: `🤕❕ @${senderId.split("@")[0]} 𝗦𝘁𝗶𝗰𝗸𝗲𝗿 𝗻𝗼𝘁 𝗮𝗹𝗹𝗼𝘄:)`,
          mentions: [senderId]
        });
      }, 500);

    } catch (e) {
      console.log("Sticker error:", e);
    }
  }
};

const antiLink = {};

module.exports = {
  config: {
    name: "antilink",
    aliases: ["linkkick"],
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
        text: "🚫 Only group admin can use this!"
      });
    }

    const action = args[0];

    if (action === "on") {
      antiLink[threadId] = true;
      return api.sendMessage(threadId, { text: "🔗 Anti-Link ON" });
    }

    if (action === "off") {
      antiLink[threadId] = false;
      return api.sendMessage(threadId, { text: "❌ Anti-Link OFF" });
    }

    return api.sendMessage(threadId, {
      text: "Use:\n.antilink on\n.antilink off"
    });
  },

  event: async ({ event, api }) => {
    try {
      const { threadId, senderId } = event;

      if (!threadId.endsWith("@g.us")) return;
      if (!antiLink[threadId]) return;

      const msg = event.message?.message;
      if (!msg) return;

      // 📩 ALL POSSIBLE TEXT SOURCE (IMPORTANT FIX)
      const text =
        msg.conversation ||
        msg.extendedTextMessage?.text ||
        msg.imageMessage?.caption ||
        msg.videoMessage?.caption ||
        "";

      if (!text) return;

      // 🔗 LINK DETECT (STRONG)
      const linkRegex = /(https?:\/\/\S+|www\.\S+|chat\.whatsapp\.com\/\S+)/i;

      if (!linkRegex.test(text)) return;

      // 🛡️ ADMIN SKIP
      const meta = await api.groupMetadata(threadId);
      const admins = meta.participants.filter(p => p.admin).map(p => p.id);
      if (admins.includes(senderId)) return;

      // ❌ DELETE MESSAGE
      try {
        await api.sendMessage(threadId, {
          delete: {
            remoteJid: threadId,
            fromMe: false,
            id: event.message.key.id,
            participant: event.message.key.participant || senderId
          }
        });
      } catch {}

      // 🚨 KICK USER
      await api.groupParticipantsUpdate(threadId, [senderId], "remove");

      // 📢 NOTIFY
      await api.sendMessage(threadId, {
        text: `🚨 @${senderId.split("@")[0]} link diyechilo → remove kora desi😆🤌🏻!`,
        mentions: [senderId]
      });

    } catch (err) {
      console.log("AntiLink Error:", err);
    }
  }
};

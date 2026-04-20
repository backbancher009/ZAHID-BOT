    
    const antiSpam = {};
const userData = {};

module.exports = {
  config: {
    name: "antispamkick",
    aliases: ["antispam"],
    permission: 2,
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
      antiSpam[threadId] = true;
      return api.sendMessage(threadId, {
        text: "🛡️ Anti-Spam ON"
      });
    }

    if (action === "off") {
      antiSpam[threadId] = false;
      return api.sendMessage(threadId, {
        text: "❌ Anti-Spam OFF"
      });
    }

    return api.sendMessage(threadId, {
      text: "Use:\n.antispam on\n.antispam off"
    });
  },

  event: async ({ event, api }) => {
    const { threadId, senderId } = event;

    if (!threadId.endsWith("@g.us")) return;
    if (!antiSpam[threadId]) return; 
    
    // ⚡ message safe check
    if (!event.message) return;

    // 🛡️ admin skip (fast)
    const meta = await api.groupMetadata(threadId);
    const admins = meta.participants.filter(p => p.admin).map(p => p.id);
    if (admins.includes(senderId)) return;

    const now = Date.now();

    const LIMIT = 5;       // 5 msg
    const TIME = 7000;     // 7 sec

    if (!userData[senderId]) userData[senderId] = [];

    userData[senderId].push(now);

    // keep only recent messages
    userData[senderId] = userData[senderId].filter(
      t => now - t < TIME
    );

    // ⚠️ warning
    if (userData[senderId].length === LIMIT) {
      await api.sendMessage(threadId, {
        text: `⚠️ @${senderId.split("@")[0]} spam korois na bro 😐`,
        mentions: [senderId]
      });
    }

    // 🚨 kick
    if (userData[senderId].length > LIMIT) {
      try {
        await api.groupParticipantsUpdate(threadId, [senderId], "remove");

        await api.sendMessage(threadId, {
          text: `🚨 @${senderId.split("@")[0]} spam er jonno kick!`,
          mentions: [senderId]
        });

        delete userData[senderId];

      } catch (e) {
        console.log("Kick error:", e);
      }
    }
  }
};

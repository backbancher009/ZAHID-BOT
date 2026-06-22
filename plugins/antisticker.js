const stickerStatus = {};

module.exports = {
config: {
name: "antisticker",
aliases: ["stickerblock", "nosticker"],
permission: 3,
prefix: true,
category: "group",
credit: "Developed by Mohammad Nayan"
},

start: async ({ event, api, args }) => {
try {
const { threadId, senderId } = event;

  if (!threadId.endsWith("@g.us")) {
    return api.sendMessage(threadId, {
      text: "*❌ This command can only be used in groups.*"
    });
  }

  const metadata = await api.groupMetadata(threadId);
  const admins = metadata.participants
    .filter(p => p.admin)
    .map(p => p.id);

  if (!admins.includes(senderId)) {
    return api.sendMessage(threadId, {
      text: "*🚫 Only group admins can use this command.*"
    });
  }

  const action = args[0]?.toLowerCase();

  if (action === "on") {
    stickerStatus[threadId] = true;

    return api.sendMessage(threadId, {
      text: "*✅ Sticker protection enabled.*"
    });
  }

  if (action === "off") {
    delete stickerStatus[threadId];

    return api.sendMessage(threadId, {
      text: "❌ Sticker protection disabled."
    });
  }

  return api.sendMessage(threadId, {
    text: `Usage:\n${global.config.PREFIX}antisticker on\n${global.config.PREFIX}antisticker off`
  });

} catch (err) {
  console.log("AntiSticker Command Error:", err);
}

},

event: async ({ event, api }) => {
try {
const { threadId, senderId, message } = event;

  if (!threadId?.endsWith("@g.us")) return;
  if (!stickerStatus[threadId]) return;

  const msg = message?.message;
  if (!msg?.stickerMessage) return;

  const metadata = await api.groupMetadata(threadId);

  const admins = metadata.participants
    .filter(p => p.admin)
    .map(p => p.id);

  // Admin bypass
  if (admins.includes(senderId)) return;

  await api.sendMessage(threadId, {
    delete: {
      remoteJid: threadId,
      fromMe: false,
      id: message.key.id,
      participant: message.key.participant || senderId
    }
  });

  setTimeout(() => {
    api.sendMessage(threadId, {
      text: `🤕❕@${senderId.split("@")[0]} 𝗦𝘁𝗶𝗰𝗸𝗲𝗿 𝗻𝗼𝘁 𝗮𝗹𝗹𝗼𝘄 :)`,
      mentions: [senderId]
    }).catch(console.error);
  }, 500);

} catch (err) {
  console.log("AntiSticker Event Error:", err);
}

}
};

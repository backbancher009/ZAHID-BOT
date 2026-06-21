module.exports = {
  config: {
    name: "all",
    permission: 3,
    prefix: true,
    category: "group",
    credit: "ZAHID"
  },

  start: async ({ event, api, args }) => {
    try {
      const { threadId, senderId, message } = event;

      if (!threadId.endsWith("@g.us")) {
        return api.sendMessage(threadId, {
          text: "❌ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!"
        }, { quoted: message });
      }

      const metadata = await api.groupMetadata(threadId);
      const participants = metadata.participants || [];

      const admins = participants
        .filter(p => p.admin)
        .map(p => p.id);

      if (!admins.includes(senderId)) {
        return api.sendMessage(threadId, {
          text: "𝗔𝗴𝗮 𝗮𝗱𝗺𝗶𝗻 𝗵𝗼𝗶𝘀 𝘁𝗮𝗿𝗽𝗼𝗿 😂🫵"
        }, { quoted: message });
      }

      const greetings = [
        "👋 সবাই কেমন আছো? একটু সবাই রেসপন্স দাও 😊",
        "🌟 হ্যালো সবাই! একটু সকলে অনলাইন আসো তো!",
        "😎 এই যে টিম! সবাই কোথায় হারিয়ে গেলে?",
        "🎉 সবাই আসো, একটু আড্ডা জমাই 😄",
        "💖 সবাই ভালো থাকো, একবার সাড়া দাও ❤️",
        "🔥 এই যে গ্রুপ! কেউ কি জেগে আছো?",
        "🥳 সবাই অনলাইন আসো, একটু মজা করি!",
        "😇 সবাই একবার রিপ্লাই দাও প্লিজ!",
        "⚡ সবাইকে ডাকা হচ্ছে, কেউ মিস করো না!",
        "🌈 এই যে সবাই, একটু সাইন দাও 😌"
      ];

      let customMsg = args?.join(" ").trim();
      if (!customMsg) {
        customMsg = greetings[Math.floor(Math.random() * greetings.length)];
      }

      let mentionText =
`╔══════════════════════╗
✨ 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘 ✨
╚══════════════════════╝

💬 ${customMsg}

━━━━━━━━━━━━━━━━━━━
`;

      const mentions = [];

      for (const participant of participants) {
        const id = participant.id;
        mentionText += `🔹 @${id.split("@")[0]}\n`;
        mentions.push(id);
      }

      mentionText += `
━━━━━━━━━━━━━━━━━━━
💌 সবাই একবার রিপ্লাই দাও 😊
`;

      await api.sendMessage(threadId, {
        text: mentionText,
        mentions
      }, { quoted: message });

    } catch (error) {
      console.error(error);
      return api.sendMessage(event.threadId, {
        text: "❌ কমান্ড চালানোর সময় একটি সমস্যা হয়েছে!"
      });
    }
  }
};

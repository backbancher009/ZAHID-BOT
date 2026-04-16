    if (!admins.includes(senderId)) {
      return api.sendMessage(threadId, {
        text: "𝗔𝗴𝗮 𝗮𝗱𝗺𝗶𝗻 𝗵𝗼𝗶𝘀 𝘁𝗮𝗿𝗽𝗼𝗿 😂🫵"
      }, { quoted: message });
    }

    if (participants.length === 0) {
      return await api.sendMessage(threadId, {
        text: '⚠️ এই গ্রুপে কোনো সদস্য পাওয়া যায়নি!'
      }, { quoted: message });
    }

    // 🌟 বাংলা ফ্রেন্ডলি মেসেজ
    const greetings = [
      "👋 *সবাই কেমন আছো? একটু সবাই রেসপন্স দাও* 😊",
      "🌟 *হ্যালো সবাই! একটু সকলে অনলাইন আসো তো*!",
      "😎 *এই যে টিম! সবাই কোথায় হারিয়ে গেলে*?",
      "🎉 *সবাই আসো, একটু আড্ডা জমাই* 😄",
      "💖 *সবাই ভালো থাকো, একবার সাড়া দাও* ❤️",
      "🔥 *এই যে গ্রুপ! কেউ কি জেগে আছো*?",
      "🥳 *সবাই অনলাইন আসো, একটু মজা করি*!",
      "😇 *সবাই একবার রিপ্লাই দাও প্লিজ*!",
      "⚡ *সবাইকে ডাকা হচ্ছে, কেউ মিস করো না*!",
      "🌈 *এই যে সবাই, একটু সাইন দাও* 😌"
    ];

    let customMsg = args.join(' ');
    if (!customMsg) {
      customMsg = greetings[Math.floor(Math.random() * greetings.length)];
    }

    // 💎 Premium Header
    let mentionText = `
╔══════════════════════╗
   ✨ 𝗚𝗥𝗢𝗨𝗣 𝗨𝗣𝗗𝗔𝗧𝗘 ✨
╚══════════════════════╝

💬 ${customMsg}

━━━━━━━━━━━━━━━━━━━
`;

    let mentions = [];

    // 👥 Member List
    participants.forEach((participant, index) => {
      const id = participant.id;
      mentionText += `🔹 @${id.split('@')[0]}\n`;
      mentions.push(id);
    });

    // 🔻 Footer
    mentionText += `
━━━━━━━━━━━━━━━━━━━
💌 *সবাই একবার রিপ্লাই দাও* 😊
`;

    // 📤 Send
    await api.sendMessage(threadId, {
      text: mentionText,
      mentions: mentions
    }, { quoted: message });
  }
};

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'Nayan', 'data', 'messageCount.json');

// 📂 Load
function loadMessageCounts() {
  if (fs.existsSync(dataFilePath)) {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  }
  return {};
}

// 💾 Save
function saveMessageCounts(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// ➕ Increment
function incrementMessageCount(groupId, userId) {
  const data = loadMessageCounts();

  if (!data[groupId]) data[groupId] = {};
  if (!data[groupId][userId]) data[groupId][userId] = 0;

  data[groupId][userId]++;
  saveMessageCounts(data);
}

// 🏆 Leaderboard
async function topMembers({ sock, chatId, isGroup, limit }) {
  if (!isGroup) {
    return sock.sendMessage(chatId, {
      text: "❌ 𝗧𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 𝗼𝗻𝗹𝘆 𝘄𝗼𝗿𝗸𝘀 𝗶𝗻 𝗴𝗿𝗼𝘂𝗽𝘀."
    });
  }

  const data = loadMessageCounts();
  const groupData = data[chatId] || {};

  // 🧹 Remove bot number
  const botId = sock.user.id || sock.user.jid;
  delete groupData[botId];

  // 🔢 Sort by message count
  let sorted = Object.entries(groupData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  if (sorted.length === 0) {
    return sock.sendMessage(chatId, {
      text: "📭 𝗡𝗼 𝗮𝗰𝘁𝗶𝘃𝗶𝘁𝘆 𝘆𝗲𝘁."
    });
  }

  // 🏅 Medals
  const medals = ["🥇", "🥈", "🥉"];
  let text = `🏆 𝗧𝗼𝗽 𝗔𝗰𝘁𝗶𝘃𝗲 𝗠𝗲𝗺𝗯𝗲𝗿𝘀\n\n`;

  sorted.forEach(([userId, count], index) => {
    const medal = medals[index] || "💠";
    const name = `@${userId.split("@")[0]}`;
    text += `${medal} ${name} — ${count} 𝗺𝘀𝗴𝘀\n`;
  });

  text += `\n✨ 𝗦𝘁𝗮𝘆 𝗮𝗰𝘁𝗶𝘃𝗲 & 𝗰𝗹𝗶𝗺𝗯 𝘁𝗵𝗲 𝗹𝗲𝗮𝗱𝗲𝗿𝗯𝗼𝗮𝗿𝗱`;

  await sock.sendMessage(chatId, {
    text,
    mentions: sorted.map(([id]) => id)
  });
}

module.exports = {
  config: {
    name: "topmembers",
    aliases: ["top", "leaderboard"],
    permission: 0,
    prefix: true,
    cooldowns: 5,
    description: "Show top active members",
    category: "Utility",
    credit: "XAHID PRIME 🍷"
  },

  // 📊 Track messages
  event: async ({ event }) => {
    const { threadId, senderId, isGroup } = event;
    if (isGroup) {
      incrementMessageCount(threadId, senderId);
    }
  },

  // 🚀 Command
  start: async ({ event, api, args }) => {
    const { threadId, isGroup } = event;
    const limit = parseInt(args[0]) || 5;

    await topMembers({
      sock: api,
      chatId: threadId,
      isGroup,
      limit
    });
  }
};

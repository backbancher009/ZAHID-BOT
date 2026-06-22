const { jidNormalizedUser } = require("@whiskeysockets/baileys");

function normalize(jid) {
  if (!jid) return null;
  return jidNormalizedUser(jid).split("@")[0];
}

module.exports = {
  config: {
    name: "adminmention",
    prefix: false,
    permission: 0,
    categorie: "Group",
    credit: "Mohammad Nayan"
  },

  start: function ({}){},

  event: async function ({ api, event }) {
    try {

      const { threadId, message, senderId, isGroup } = event;
      if (!isGroup) return;
      const msg = event.message.message;

      const mentioned =
        msg?.extendedTextMessage?.contextInfo?.mentionedJid || [];



      if (!mentioned.length) return;


      const mentionedNumbers = mentioned.map(jid => normalize(jid));
      


      const adminNumbers = (global.config.admin || [])

      


      const isMatch = mentionedNumbers.some(num =>
        adminNumbers.includes(num)
      );

      if (!isMatch) return;


      var texts = [
        "Mantion দিস না তালুকদার বস এর মন ভালো নেই আজকে 💔🥀",
        "আমার সাথে কেউ সে*ক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
        "এত মেনশন না দিয়ে বক্স আসো হট করে দিবো🤷‍ঝাং 😘🥒",
        "Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 😾😾🔨",
        "রানা বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
        "এতো মিনশন নাহ দিয়া সিংগেল তালুকদার রে একটা গফ দে 😒😏",
        "Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
        "মেনশন দিস না পারলে একটা গফ দে",
        "Mantion_দিস না বাঁলপাঁক্না তালুকদার প্রচুর বিজি 🥀🤐",
        "চুমু খাওয়ার বয়স টা  চকলেট🍫খেয়ে উড়িয়ে দিলাম🤗"
      ];

      const reply = texts[Math.floor(Math.random() * texts.length)];

      return api.sendMessage(
        event.threadId,
        { text: `@${senderId.split('@')[0]}, `+ reply,
        mentions: [senderId]
        },
        { quoted: event.message }
      );

    } catch (err) {
      console.error("❌ AntiMention error:", err);
    }
  }
};

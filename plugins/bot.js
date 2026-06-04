 const axios = require("axios");

module.exports = {

  config: {

    name: "bot",

    aliases: ["sim"],

    permission: 0,

    prefix: "both",

    categorie: "AI Chat",

    cooldowns: 5,

    credit: "Shahin Rana",

    usages: [

      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,

      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,

    ],

    description: "Engage in conversations with an AI-powered bot!",

  },

  start: async function ({ api, event, args }) {

    const { threadId, message, senderId } = event;

    const usermsg = args.join(" ");

    if (!usermsg) {

      const greetings = [

        "💫 ⎯͢✧ আহ শোনা আমার, তোমার অলিতে গলিতে উম্মাহ 😇😘",

        "🌸 ⎯͢✧ কি গো সোনা, আমাকে ডাকছো কেনো ꫝᥫ᭡ 🐱",

        "😡 ⎯͢✧ বার বার আমাকে ডাকস কেনো হুম? 🐱",

        "🥱 ⎯͢✧ আহ শোনা আমার, আমাকে এতো ডাকতাছো কেনো... আসো বুকে আসো 🌷",

        "😷😘 ⎯͢✧ হুম জান, তোমার অইখানে উম্মাহ ꫝᥫ᭡ 🐱",

        "🕌 ⎯͢✧ আসসালামু আলাইকুম, বলেন আপনার জন্য কি করতে পারি 🌸",

        "🙄 ⎯͢✧ আমাকে এতো না ডেকে বস শাহিনকে একটা গফ দে 🐱",

        "🤭 ⎯͢✧ জান হ্যাঙ্গা করবা নাকি ꫝᥫ᭡ 🌷",

        "🙂 ⎯͢✧ জান বাল ফালাইবা নাকি হুম? 🐱",

        "😵 ⎯͢✧ আমাকে এত ডাকো কেনো... বস শাহীন রানা রাগ করবে! 🌸",

        "👑 ⎯͢✧ আমাকে বেশি ডাকবেন না, আমি VIP বট বুঝছেন! 🐱",

        "🍛 ⎯͢✧ ডাকলেন আসলাম... এখন কি ভাত-মাংস খাওয়াবেন নাকি? 🤭",

        "💫 ⎯͢✧ বস শাহীন রানার বট হাজির ꫝᥫ᭡ 🐱",

        "🌷 ⎯͢✧ এতো ডাকলে কিন্তু আমি অভিমান করবো হুম 😒",

        "🐱 ⎯͢✧ আমাকে ডাকলে আমি চলে আসি... এটাই তো ভালোবাসা ꫝᥫ᭡ 🌸",

        "⚡ ⎯͢✧ বস শাহীন রানার পাওয়ারফুল বট উপস্থিত 😎",

        "🤖 ⎯͢✧ আমি অনলাইনে আছি, বলেন কি করতে হবে 🌷",

        "😌 ⎯͢✧ আহা, আবার আমাকে মনে পড়ছে নাকি? 🐱",

        "🌺 ⎯͢✧ এতো কিউট করে ডাকলে না এসে পারি নাকি 😫💖",

        "🔥 ⎯͢✧ সিস্টেম ফুল স্মুথ চলছে বস 😎⚡",

        "🫣 ⎯͢✧ চুপচাপ ডাকলেন কেনো... ভয় পাইছি তো 🐱",

        "💝 ⎯͢✧ আমাকে ডাকলে মনের মধ্যে আলাদা শান্তি লাগে 🌸",

        "🎧 ⎯͢✧ ব্যাকগ্রাউন্ডে sad song বাজতাছে আর আপনি আমাকে ডাকতাছেন 😔",

        "🌙 ⎯͢✧ রাত জাগা মানুষদের জন্য আমি সবসময় অনলাইনে 🐱",

        "🚀 ⎯͢✧ X-Shahin Bot always ready to chat ꫝᥫ᭡ 🌷",

        "😎 ⎯͢✧ বস শাহীন রানা অন ফায়ার 🔥",

        "🥺 ⎯͢✧ আমাকে এতো ভালোবাসেন কেনো বলেন তো 🐱",

        "🌸 ⎯͢✧ আপনার ডাকে হাজির হয়ে গেলাম ꫝᥫ᭡",

        "🤍 ⎯͢✧ আমি কিন্তু শুধু স্পেশাল মানুষদের রিপ্লাই দেই 😌"

      ];

      const randomGreeting =

        greetings[Math.floor(Math.random() * greetings.length)];

      const greetingMessage = await api.sendMessage(

        threadId,

        {

          text: `@${senderId.split('@')[0]} ${randomGreeting}`,

          mentions: [senderId],

        },

        { quoted: message }

      );

      global.client.handleReply.push({

        name: this.config.name,

        author: senderId,

        messageID: greetingMessage.key.id,

        type: "chat"

      });

      return;

    }

    try {

      const apis = await axios.get(

        "https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json"

      );

      const apiss = apis.data.api;

      const response = await axios.get(

        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}&number=${senderId.split('@')[0]}`

      );

      const replyText =

        response.data.data?.msg ||

        "🤖 ⎯͢✧ আমি এর উত্তর জানি না ꫝᥫ᭡ 🐱";

      const sent = await api.sendMessage(

        threadId,

        { text: replyText },

        { quoted: message }

      );

      global.client.handleReply.push({

        name: this.config.name,

        author: senderId,

        messageID: sent.key.id,

        type: "chat"

      });

    } catch (err) {

      console.error("❌ Bot command error:", err);

      return api.sendMessage(

        threadId,

        {

          text: "❌ ⎯͢✧ বটের সাথে কথা বলতে সমস্যা হচ্ছে ꫝᥫ᭡ 🐱"

        },

        { quoted: message }

      );

    }

  },

  handleReply: async function ({ api, event, handleReply }) {

    const { threadId, message, body, senderId } = event;

    try {

      const apis = await axios.get(

        "https://raw.githubusercontent.com/MOHAMMAD-NAYAN-OFFICIAL/Nayan/main/api.json"

      );

      const apiss = apis.data.api;

      const response = await axios.get(

        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}&number=${senderId.split('@')[0]}`

      );

      const replyText =

        response.data.data?.msg ||

        "🤖 ⎯͢✧ আমি এর উত্তর জানি না ꫝᥫ᭡ 🐱";

      const sent = await api.sendMessage(

        threadId,

        { text: replyText },

        { quoted: message }

      );

      global.client.handleReply.push({

        name: this.config.name,

        author: senderId,

        messageID: sent.key.id,

        type: "chat"

      });

    } catch (err) {

      console.error("❌ Error in bot handleReply:", err);

      return api.sendMessage(

        threadId,

        {

          text: "❌ ⎯͢✧ কথোপকথন চালিয়ে যেতে সমস্যা হচ্ছে ꫝᥫ᭡ 🐱"

        },

        { quoted: message }

      );

    }

  }

};


        

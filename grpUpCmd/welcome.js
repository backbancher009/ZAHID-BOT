module.exports = {

  event: 'add',

  handle: async ({ api, event }) => {

    const newMembers = event.participants;

    const groupInfo = await api.groupMetadata(event.id);

    const groupName = groupInfo.subject;

    const totalMembers = groupInfo.participants.length;

    // 🔥 র‍্যান্ডম বাংলা স্ট্যাটাস

    const banglaStatus = [

      "🌸 নতুন অতিথি এসেছে, গ্রুপের হাওয়া বদলে গেলো!",

      "✨ তোমায় পেয়ে আমাদের পরিবার আরও রঙিন!",

      "💙 হাসিমুখে থেকো, গ্রুপ জমিয়ে রাখবে আশা করি!",

      "🌺 নতুন রাজা এসে গেছে আমাদের গ্রুপে!",

      "🔥 চল আজকে একটু ভিন্নরকম মজা হোক!",

      "🎉 গ্রুপে ঢুকেই তোমার এন্ট্রি স্টাইলিশ!",

      "🌼 আশা করি তুমি দারুণ অ্যাক্টিভ থাকবে!",

      "😎 এসে যাও, এখন শুরু হোক আড্ডার রাজত্ব!",

      "💫 তোমার কারণে গ্রুপের মান আরও আপ!",

      "😂 গ্রুপের টেনশন এখন তোমার হাতে!",

      "🌟 তোমায় ছাড়া গ্রুপটা যেন অসম্পূর্ণ ছিলো!",

      "🌷 তোমাকে দেখে গ্রুপের ভাইব আপ হয়ে গেলো!",

      "🔥 মনে হচ্ছে আজ গ্রুপে ঝড় আসছে!",

      "🐥 গ্রুপে এক ফ্রেশ ভাইব ঢুকে গেছে!",

      "💖 সবাইকে চমক দিতে তুমি এসেছো!",

      "😄 গ্রুপে নতুন হাসির ঝিলিক!",

      "🌈 আজ গ্রুপটা ফ্রেশ কারণ তুমি এসেছো!",

      "⚡ তোমার এন্ট্রি = পুরো গ্রুপ চার্জড!",

      "🎭 এখন থেকে গ্রুপে শুরু হবে আসল মজা!",

      "💥 সাবধান! নতুন মেম্বার = নতুন ঝগড়া ও হাসি!",

      "😂 ভাবছো শুধু এড হয়েছো? না! এখন তুমি পরিবারের অংশ!",

      "🔮 মনে হচ্ছে তুমি গ্রুপের হিডেন লিজেন্ড!",

      "😻 তোমার এন্ট্রি গ্রুপে কিউট ভাইব এনেছে!",

      "🔥 গ্রুপে তোমার মতো একজনকেই দরকার ছিলো!"

    ];

    for (const member of newMembers) {

      let profilePicUrl;

      try {

        profilePicUrl = await api.profilePictureUrl(member, 'image');

      } catch {

        profilePicUrl = null;

      }

      const username = `@${member.split('@')[0]}`;

      const randomStatus = banglaStatus[Math.floor(Math.random() * banglaStatus.length)];

      const welcomeMessage =

`🦢 *⎯͢✧ 𝐇ᴇʏ ${username}, ⎯͢✧ আমাদের গ্রুপ ${groupName}-এ তোমাকে স্বাগতম!* ✨

💗 *⎯͢✧ ${randomStatus}* 🎧...

🏠 *⎯͢✧ মোট সদস্য:* ${totalMembers}

🌟 *⎯͢✧ নিয়ম:* অ্যাক্টিভ থাকো, সবাইকে রেসপেক্ট দাও ও মজা করো!

⎯͢✧🤖 𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 ⎯͢✧🐱

⎯͢✧🌷 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀꫝᥫ᭡ 🐱`;

      if (profilePicUrl) {

        await api.sendMessage(event.id, {

          image: { url: profilePicUrl },

          caption: welcomeMessage,

          mentions: [member]

        });

      } else {

        await api.sendMessage(event.id, {

          text: welcomeMessage,

          mentions: [member]

        });

      }

    }

  }

};

 
  

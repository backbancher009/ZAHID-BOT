  module.exports = {
  config: {
    name: `${global.config.PREFIX}`,
    aliases: [],
    permission: 0,
    prefix: true,
    description: 'Responds with a random inspirational quote or image when the prefix is entered.',
    categories: "utility",
    usages: [
      `${global.config.PREFIX} - Send the prefix to get a random quote and image.`
    ]
  },

  event: async ({ event, api, body }) => {
    const { threadId } = event;

    const userMessage = body.toLowerCase();

    if (userMessage === `${global.config.PREFIX}`) {
      const captions = [
        "ღ••\n– কোনো নেতার পিছনে নয়.!!🤸‍♂️\n– মসজিদের ইমামের পিছনে দাড়াও জীবন বদলে যাবে ইনশাআল্লাহ.!!🖤🌻\n۵\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "-!\n__আল্লাহর রহমত থেকে নিরাশ হওয়া যাবে না!” আল্লাহ অবশ্যই তোমাকে ক্ষমা করে দিবেন☺️🌻\nসুরা যুমাহ্ আয়াত ৫২..৫৩💙🌸\n-!\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "- ইসলাম অহংকার করতে শেখায় না!🌸\n\n- ইসলাম শুকরিয়া আদায় করতে শেখায়!🤲🕋🥀\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "- বেপর্দা নারী যদি নায়িকা হতে পারে 🤗🥀\nতবে পর্দাশীল নারী গুলো ইসলামের শাহাজাদী 🌺🥰\nমাশাল্লাহ।।\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "┏━━━━ ﷽ ━━━━┓\n🖤 স্মার্ট নয় ইসলামিক জীবন সঙ্গি খুঁজুন 🥰\n┗━━━━ ﷽ ━━━━┛\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "ღ࿐ যখন বান্দার জ্বর হয় 😇\nগুনাহ গুলো ঝড়ে পড়ে ☺️\nহযরত মুহাম্মদ (সাঃ)\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "~🍂🦋\nHappiness is enjoying the little things in life 🌸\nAlhamdulillah for everything 💗🥰\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "তুমি আসক্ত হও তবে নেশায় নয় আল্লাহর ইবাদতে 🖤🌸✨\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "হাসতে হাসতে একদিন সবাইকে কাঁদিয়ে বিদায় নিবো 🙂💔🥀\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "🦋🥀\nহাজারো স্বপ্নের শেষ স্থান কবরস্থান ♡\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "প্রসঙ্গ যখন ধর্ম নিয়ে 🥰\nইসলামই সেরা ❤️\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "কেউ পছন্দ না করলে কি যায় আসে 🙂\nআল্লাহ তো পছন্দ করেই বানিয়েছে 🥰\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "অহংকার করে লাভ নেই 🌼\nমৃত্যু নিশ্চিত 🖤🙂\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "অতীতের পাপের অধ্যায় শেষ করে ফিরে আসুন রবের পথে 🖤🥀\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "বুকে কষ্ট নিয়ে আলহামদুলিল্লাহ বলাটা বিশ্বাসের নমুনা ❤️🥀\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀",

        "আল্লাহর ভালোবাসা পেতে চাইলে রাসুল (সা:)কে অনুসরণ করো 🥰\n\n⎯͢✧ 🍁 𝐒ʜᴀʜɪɴ 𝐑ᴀɴᴀ 💗🌷🎀"
      ];

      const images = [
        "https://i.postimg.cc/7LdGnyjQ/images-31.jpg",
        "https://i.postimg.cc/65c81ZDZ/images-30.jpg",
        "https://i.postimg.cc/Y0wvTzr6/images-29.jpg",
        "https://i.postimg.cc/1Rpnw2BJ/images-28.jpg",
        "https://i.postimg.cc/mgrPxDs5/images-27.jpg",
        "https://i.postimg.cc/yxXDK3xw/images-26.jpg",
        "https://i.postimg.cc/kXqVcsh9/muslim-boy-having-worship-praying-fasting-eid-islamic-culture-mosque-73899-1334.webp",
        "https://i.postimg.cc/hGzhj5h8/muslims-reading-from-quran-53876-20958.webp",
        "https://i.postimg.cc/x1Fc92jT/blue-mosque-istanbul-1157-8841.webp",
        "https://i.postimg.cc/j5y56nHL/muhammad-ali-pasha-cairo-219717-5352.webp",
        "https://i.postimg.cc/dVWyHfhr/images-1-21.jpg",
        "https://i.postimg.cc/q7MGgn3X/images-1-22.jpg",
        "https://i.postimg.cc/sX5CXtSh/images-1-16.jpg",
        "https://i.postimg.cc/66Rp2Pwz/images-1-17.jpg",
        "https://i.postimg.cc/Qtzh9pY2/images-1-18.jpg",
        "https://i.postimg.cc/MGrhdz0R/images-1-19.jpg",
        "https://i.postimg.cc/LsMSj9Ts/images-1-20.jpg",
        "https://i.postimg.cc/KzNXyttX/images-1-13.jpg",
      ];

      const randomCaption = captions[Math.floor(Math.random() * captions.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];

      await api.sendMessage(threadId, {
        image: { url: randomImage },
        caption: randomCaption,
      });
    }
  }
};

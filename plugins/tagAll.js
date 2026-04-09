module.exports = {
    config: {
        name: 'tagall',
        aliases: ['all', 'mentionall'],
        permission: 3, // 3 = only admins/premium
        prefix: true,
        description: 'Mentions all members of a group with stylish greetings (Premium only).',
        categories: 'group',
        usages: [`${global.config.PREFIX}tagall [optional message]`],
        credit: 'Developed by Mohammad Nayan'
    },

    start: async ({ event, api, args, isPremium }) => {
        const { threadId, senderId, message } = event;

        // ❌ Permission check for general users
        if (!isPremium) {
            // সাধারণ ইউজারের জন্য সরাসরি রিপ্লাই
            return await api.sendMessage(threadId, {
                text: '𝗔𝗴𝗮 𝗮𝗱𝗺𝗶𝗻 𝗵𝗼𝗶𝘀 𝘁𝗮𝗿𝗽𝗼𝗿 😆❌',
            }, { quoted: message });
        }

        const groupMetadata = await api.groupMetadata(threadId);
        const participants = groupMetadata.participants || [];

        if (participants.length === 0) {
            return await api.sendMessage(threadId, { text: '⚠️ গ্রুপে কোনো সদস্য খুঁজে পাওয়া যায়নি।' }, { quoted: message });
        }

        // ✨ Stylish greetings
        const greetings = [
            "👋 𝗛𝗲𝘆 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲! 𝗥𝗲𝗮𝗱𝘆 𝗳𝗼𝗿 𝘀𝗼𝗺𝗲 𝗳𝘂𝗻 𝘁𝗼𝗱𝗮𝘆?",
            "🌟 𝗛𝗲𝗹𝗹𝗼 𝗯𝗲𝗮𝘂𝘁𝗶𝗳𝘂𝗹 𝗽𝗲𝗼𝗽𝗹𝗲! 𝗦𝘁𝗮𝘆 𝗮𝘄𝗲𝘀𝗼𝗺𝗲!",
            "😎 𝗬𝗼 𝘁𝗲𝗮𝗺! 𝗟𝗲𝘁’𝘀 𝗺𝗮𝗸𝗲 𝘁𝗼𝗱𝗮𝘆 𝗮𝗺𝗮𝘇𝗶𝗻𝗴!",
            "🎉 𝗛𝗶 𝗳𝗿𝗶𝗲𝗻𝗱𝘀! 𝗧𝗶𝗺𝗲 𝗳𝗼𝗿 𝘀𝗼𝗺𝗲 𝗴𝗿𝗼𝘂𝗽 𝗰𝗵𝗮𝗼𝘀 😜",
            "💖 𝗚𝗿𝗲𝗲𝘁𝗶𝗻𝗴𝘀 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲! 𝗦𝗽𝗿𝗲𝗮𝗱 𝗹𝗼𝘃𝗲 𝗮𝗻𝗱 𝗹𝗮𝘂𝗴𝗵𝘁𝗲𝗿!",
            "🔥 𝗪𝗵𝗮𝘁’𝘀 𝘂𝗽 𝗳𝗮𝗺? 𝗟𝗲𝘁’𝘀 𝗿𝗼𝗰𝗸 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽!",
            "🥳 𝗛𝗲𝗹𝗹𝗼 𝗮𝗹𝗹! 𝗣𝗮𝗿𝘁𝘆 𝘃𝗶𝗯𝗲𝘀 𝗢𝗡!",
            "😇 𝗛𝗲𝘆 𝗹𝗲𝗴𝗲𝗻𝗱𝘀! 𝗞𝗲𝗲𝗽 𝘀𝗺𝗶𝗹𝗶𝗻𝗴 𝘁𝗼𝗱𝗮𝘆!",
            "⚡ 𝗔𝘁𝘁𝗲𝗻𝘁𝗶𝗼𝗻 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲! 𝗙𝘂𝗻 𝗺𝗼𝗱𝗲 𝗮𝗰𝘁𝗶𝘃𝗮𝘁𝗲𝗱!",
            "🌈 𝗛𝗲𝗹𝗹𝗼 𝘀𝘁𝗮𝗿𝘀! 𝗦𝗵𝗶𝗻𝗲 𝗯𝗿𝗶𝗴𝗵𝘁 𝘁𝗼𝗱𝗮𝘆!"
        ];

        let customMsg = args.join(' ');
        if (!customMsg) {
            customMsg = greetings[Math.floor(Math.random() * greetings.length)];
        }

        // 📝 Build mention text
        let mentionText = `✨ *${customMsg}* ✨\n\n`;
        let mentions = [];

        participants.forEach((participant, index) => {
            mentionText += `🔹 ${index + 1}. @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        mentionText += `\n📢 𝗛𝗮𝘃𝗲 𝗮 𝗴𝗿𝗲𝗮𝘁 𝗱𝗮𝘆, 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲!`;

        // 📤 Send message
        await api.sendMessage(threadId, {
            text: mentionText,
            mentions: mentions
        }, { quoted: message });
    }
};

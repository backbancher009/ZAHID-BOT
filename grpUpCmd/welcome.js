module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;
      const welcomeMessage = `🎉✨ *𝗛𝗲𝘆 ${username}, 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 ${groupName}!* ✨🎉\n\n` +
        `🚀 𝗬𝗼𝘂 𝗷𝘂𝘀𝘁 𝗹𝗮𝗻𝗱𝗲𝗱 𝗶𝗻 𝗮𝗻 𝗮𝘄𝗲𝘀𝗼𝗺𝗲 𝗴𝗿𝗼𝘂𝗽!\n` +
        `👥 *𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗯𝗲𝗿𝘀:* ${totalMembers}\n` +
        `📢 *𝗥𝘂𝗹𝗲𝘀:* 𝗕𝗲 𝗿𝗲𝘀𝗽𝗲𝗰𝘁𝗳𝘂𝗹, 𝘀𝘁𝗮𝘆 𝗮𝗰𝘁𝗶𝘃𝗲 & 𝗲𝗻𝗷𝗼𝘆!`;

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

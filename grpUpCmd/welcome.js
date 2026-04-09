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
      } catch {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;

      // 💎 Premium + group focus lines
      const messages = [
        `🌈 Welcome ${username}\n\nWelcome to *${groupName}*.\nHope you enjoy being part of this group.\n\n👥 Members: ${totalMembers}`,

        `👋 Hello ${username}\n\nYou’ve joined *${groupName}*.\nTake your time and enjoy the environment.\n\n👥 Members: ${totalMembers}`,

        `🌿 ${username}, welcome\n\nThis is *${groupName}* — glad to have you here.\nStay active and enjoy your time.\n\n👥 Members: ${totalMembers}`,

        `💫 Welcome ${username}\n\nYou are now part of *${groupName}*.\nMake yourself comfortable.\n\n👥 Members: ${totalMembers}`,

        `🌟 Hey ${username}\n\nWelcome to *${groupName}*.\nLet’s make this place even better together.\n\n👥 Members: ${totalMembers}`
      ];

      const text = messages[Math.floor(Math.random() * messages.length)];

      if (profilePicUrl) {
        await api.sendMessage(event.id, {
          image: { url: profilePicUrl },
          caption: text,
          mentions: [member]
        });
      } else {
        await api.sendMessage(event.id, {
          text,
          mentions: [member]
        });
      }
    }
  }
};

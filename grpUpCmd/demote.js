module.exports = {
  event: 'demote',
  handle: async ({ api, event }) => {
    const demotedMembers = event.participants;
    const adminWhoDemoted = event.author; // কে ডিমোট করলো

    for (const member of demotedMembers) {
      await api.sendMessage(event.id, {
        text: `😢 @${member.split('@')[0]} ⎯͢✧ 𝐡ᴀꜱ ʙᴇᴇɴ ᴅᴇᴍᴏᴛᴇᴅ. 𝐁ᴇᴛᴛᴇʀ ʟᴜᴄᴋ ɴᴇxᴛ ᴛɪᴍᴇ!
👮‍♂️⎯͢✧𝐃ᴇᴍᴏᴛᴇᴅ 𝐁ʏ: @${adminWhoDemoted.split('@')[0]}`,
        mentions: [member, adminWhoDemoted]
      });
    }
  }
};

module.exports = {
  event: 'promote',
  handle: async ({ api, event }) => {
    const promotedMembers = event.participants;
    const promoter = event.author || event.sender || "Unknown";

    console.log(event);

    for (const member of promotedMembers) {
      const user = member.split('@')[0];
      const by = promoter.split('@')[0];

      await api.sendMessage(event.id, {
        text: `🎉 ⎯͢✧𝐂ᴏɴɢʀᴀᴛᴜʟᴀᴛɪᴏɴ𝐒 @${user}! ⎯͢✧𝐘ᴏᴜ ᴀʀᴇ ɴᴏᴡ ᴀɴ 𝐀ᴅᴍɪɴ!
👑 ⎯͢✧𝐏ʀᴏᴍᴏᴛᴇᴅ ʙʏ: @${by}`,
        mentions: [member, promoter]
      });
    }
  }
};

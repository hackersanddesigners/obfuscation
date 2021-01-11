const bigbluebot = require('bigbluebot');

const actions = async page => {
  // console.log(bigbluebot)
  await bigbluebot.audio.modal.microphone(page);
  // await bigbluebot.video.join(page);
  // await bigbluebot.chat.send(page);
  // await bigbluebot.chat.close(page);
  // await bigbluebot.note.open(page);
  // await bigbluebot.note.write(page);
  console.log(page);
  // await bigbluebot.user.manage.open(page);
  await bigbluebot.user.list(page);
};

bigbluebot.run(actions);

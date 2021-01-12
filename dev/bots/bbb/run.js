const bigbluebot = require('bigbluebot');
const io = require("socket.io-client")
           .connect("http://io.karls.computer");

io.on('connect', () => {
  io.emit('pingServer', io.id, 'bot is here')
  const actions = async page => {
    // console.log(bigbluebot)
    // await bigbluebot.audio.modal.microphone(page);
    // await bigbluebot.video.join(page);
    // await bigbluebot.chat.send(page);
    // await bigbluebot.chat.close(page);
    io.emit('pingServer', io.id, 'bot is joining bbb room')

    await bigbluebot.note.open(page);

    io.emit('pingServer', io.id, 'bot is getting etherpad url, wait.')

    const url = await bigbluebot.note.getNoteURL(page);

    io.emit('pingServer', io.id, url)
    io.emit('pingServer', io.id, 'bot is writing in pad :]')

    await bigbluebot.note.write(page);
    await bigbluebot.note.write(page);
    await bigbluebot.note.write(page);


    // console.log(page);
    // await bigbluebot.user.manage.open(page);
    // await bigbluebot.user.list(page);
  };

  bigbluebot.run(actions);

})
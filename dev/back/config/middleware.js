module.exports = {
  //...
  settings: {
    cors: {
      enabled: true,
      // headers: '*',
      origin: ["http://localhost", "https://3rd.obfuscationworkshop.or", "https://obfuscation.karls.computer"],
    },
    xframe: {
      enabled: false,
    }
  },
};

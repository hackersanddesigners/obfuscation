module.exports = {
  //...
  settings: {
    cors: {
      enabled: true,
      // headers: '*',
      origin: ["http://localhost", "https://3rd.obfuscationworkshop.org", "https://obfuscation.karls.computer"],
    },
    xframe: {
      enabled: false,
    }
  },
};

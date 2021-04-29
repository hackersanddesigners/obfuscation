module.exports = {
  //...
  settings: {
    cors: {
      enabled: true,
      // headers: '*',
      origin: ["http://localhost", "https://3rd.obfuscationworkshop.org", "https://obfuscation.karls.computeR"],
    },
    xframe: {
      enabled: false,
    }
  },
};

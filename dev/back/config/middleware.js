module.exports = {
  //...
  settings: {
    cors: {
      enabled: true,
      headers: '*',
      // origin: ["http://localhost:8080", "https://3rd.obfuscationworkshop.org", "https://obfuscation.karls.computer"],
    },
    xframe: {
      enabled: false,
    },
    parser: {
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 1000 * 1024 * 1024 // 1gb
      }
    }
  },
};

const baseHosts = {
  // development
  development: {
    baseHost: 'http://localhost:3000/',
    uploadPath: 'public/',
  },

  // production
  production: {
    baseHost: 'http://101.35.248.228:3000', // 应用公网地址
    uploadPath: 'public/',
  },
};

export { baseHosts };

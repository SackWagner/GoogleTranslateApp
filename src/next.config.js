module.exports = {
   
    webpack: (config) => {
      config.resolve.fallback = { "url": require.resolve("url/")};
  
      return config;
    },
  };
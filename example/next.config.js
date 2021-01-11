const path = require('path');
const withTM = require('next-transpile-modules')(['@storyofams/helpers']);

module.exports = withTM({
  webpack: (config) => {
    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'react',
    );

    return config;
  },
});

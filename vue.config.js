module.exports = {
    chainWebpack: config => {},
    configureWebpack: {
        entry: ['babel-polyfill', './src/main.js']
    }
};

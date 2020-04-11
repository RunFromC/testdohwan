const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    configureWebpack: {
        entry: ['babel-polyfill', './src/main.js'],
        performance: {
            hints: false
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 6,
                        compress: { drop_console: true },
                        output: { comments: false, beautify: false }
                    }
                })
            ]
        }
    }
};
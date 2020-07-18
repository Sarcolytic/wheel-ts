const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge (common, {
    mode: 'production',
    devtool: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                    extractComments: false,
            }),
        ],
    },
});

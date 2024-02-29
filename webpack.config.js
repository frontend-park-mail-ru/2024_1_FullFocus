const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src'),
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
        ],
    },
};
// module.exports = {
//     entry: {
//         index: 'src/index.pug',
//     },
//     output: {
//         path: path.resolve(__dirname, 'public'),
//         publicPath: '/',
//     },
//     plugins: [
//         new PugPlugin({
//             js: {
//                 filename: '[name].[contenthash:8].js',
//             },
//         }),
//     ],
// };

// node: {
//     fs: 'empty'
// }

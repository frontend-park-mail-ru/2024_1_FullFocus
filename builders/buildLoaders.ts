import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildMode } from './types/types';

export function buildLoaders(mode: BuildMode): ModuleOptions['rules'] {
    const isDev = mode === 'development';

    const babelLoader = {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ],
    };

    const pugLoader = {
        test: /\.pug$/,
        loader: 'pug-loader',
    };

    const fontsAssetLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
    };

    const imgAssetLoader = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
        },
    };

    return [
        babelLoader,
        scssLoader,
        pugLoader,
        fontsAssetLoader,
        imgAssetLoader,
    ];
}

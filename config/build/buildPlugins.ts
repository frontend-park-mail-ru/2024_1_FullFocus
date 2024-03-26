import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import { BuildMode, BuildPaths, BuildPlatform } from './types/types';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export function buildPlugins(
    mode: BuildMode,
    paths: BuildPaths,
    analyzer: boolean,
    platform: BuildPlatform,
): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    // Common plugins
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.favicon, 'favicon.ico'),
        }),
        new DefinePlugin({
            PLATFORM: JSON.stringify(platform),
        }),
    ];

    // Plugins for development build
    if (isDev) {
        plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    // Plugins for production build
    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        );
    }

    if (analyzer) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}

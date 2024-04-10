import webpack from 'webpack';
// import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',

        entry: {
            index: paths.entry,
        },

        devServer: isDev ? buildDevServer(options.port) : undefined,

        devtool: isDev ? 'inline-source-map' : false,

        plugins: buildPlugins(
            options.mode,
            options.paths,
            options.analyzer,
            options.platform,
        ),

        module: {
            rules: buildLoaders(options.mode),
        },

        resolve: buildResolvers(options.paths.src),

        output: {
            filename: '[name].js',
            publicPath: '/public/',
            path: paths.output,
            clean: true,
        },
    };
}

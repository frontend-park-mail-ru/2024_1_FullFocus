import webpack from 'webpack';
import { buildWebpack } from './builders/buildWebpack';
import { BuildMode, BuildPaths, BuildPlatform } from './builders/types/types';
import path from 'path';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: path.resolve(__dirname, 'public'),
        html: path.resolve(__dirname, 'src', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        favicon: path.resolve(__dirname, 'src/shared/favicon'),
    };

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths: paths,
        analyzer: env.analyzer ?? false,
        platform: env.platform ?? 'desktop',
    });

    return config;
};

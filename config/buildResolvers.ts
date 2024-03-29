import { Configuration } from 'webpack';

export function buildResolvers(src: string): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        conditionNames: ['import', 'node'],
        preferAbsolute: true,
        modules: [src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            '@': src,
        },
    };
}

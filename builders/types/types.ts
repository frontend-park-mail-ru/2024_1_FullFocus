export interface BuildPaths {
    entry: string;
    sw: string;
    html: string;
    output: string;
    src: string;
    favicon: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    platform: BuildPlatform;
    analyzer: boolean;
}

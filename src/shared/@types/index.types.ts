declare module '*.module.scss' {
    interface IClassNames {
        [classNames: string]: string;
    }

    const classNames: IClassNames;
    export = classNames;
}

declare module '*.pug' {
    const value: import('./templateFunction').TmplFunc;
    export = value;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const PLATFORM: 'mobile' | 'desktop';

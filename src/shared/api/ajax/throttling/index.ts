const DELAY = 'delay';

export function throttle<Args, Return>(
    func: (args: Args) => Return,
    delay: number,
) {
    let timeFlag: string = null;
    return (newArgs: Args) => {
        if (timeFlag === null) {
            timeFlag = DELAY;
            setTimeout(() => {
                timeFlag = null;
            }, delay);
            return func(newArgs);
        }
    };
}

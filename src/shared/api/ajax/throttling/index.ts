export function throttle<Args, Return>(
    func: (args?: Args) => Return,
    delay: number,
) {
    let timeFlag: NodeJS.Timeout = null;
    let lastCall: Args = null;
    let prevLastCall: Args = null;

    return (args?: Args) => {
        if (timeFlag === null) {
            timeFlag = setTimeout(() => {
                timeFlag = null;

                if (args !== lastCall && lastCall !== null) {
                    prevLastCall = lastCall;
                    lastCall = null;
                    return func(prevLastCall);
                }
            }, delay);

            return func(args);
        }

        if (timeFlag !== null) {
            lastCall = args;
        }
    };
}

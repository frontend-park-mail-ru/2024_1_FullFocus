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

export function animateLongRequest<Args, Return>(
    request: (args?: Args) => Promise<Return>,
    callback: (args?: Return) => void,
    startAnimation: () => void,
    stopAnimation: () => void,
    animateAfter: number,
    animateFor: number,
) {
    let timeFlag: NodeJS.Timeout = null;
    let isRequestCompleted = false;

    return (args?: Args) => {
        if (timeFlag === null) {
            timeFlag = setTimeout(() => {
                timeFlag = null;
                if (!isRequestCompleted) {
                    startAnimation();
                }
            }, animateAfter);

            request(args)
                .then((response: Return) => {
                    isRequestCompleted = true;

                    // if animation started
                    if (timeFlag === null) {
                        setTimeout(() => {
                            stopAnimation();
                            callback(response);
                        }, animateFor);
                    }

                    if (timeFlag !== null) {
                        stopAnimation();
                        callback(response);
                    }
                })
                .catch(() => {
                    stopAnimation();
                });
        }
    };
}

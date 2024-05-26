export function throttle<Args>(func: (args?: Args) => void, delay: number) {
    let timeFlag: NodeJS.Timeout = null;
    let lastCall: Args = null;
    let debounce = false;
    // let prevLastCall: Args = null;

    return (args?: Args) => {
        const withTimeFlag = timeFlag !== null;

        if (!withTimeFlag) {
            debounce = false;
            timeFlag = setTimeout(() => {
                timeFlag = null;

                if (debounce) {
                    debounce = false;
                    func(lastCall);
                }
            }, delay);

            func(args);
        }

        if (withTimeFlag) {
            debounce = true;
            lastCall = args;
        }
    };
}

export function animateLongRequest<Args, Return>(
    request: (args?: Args) => Promise<Return>,
    thenFunc: (args?: Return) => void,
    catchFunc: (args?: Return) => void,
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
                            thenFunc(response);
                        }, animateFor);
                    }

                    if (timeFlag !== null) {
                        stopAnimation();
                        thenFunc(response);
                    }
                })
                .catch((response: Return) => {
                    stopAnimation();
                    catchFunc(response);
                });
        }
    };
}

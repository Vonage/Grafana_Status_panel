import { useEffect, useLayoutEffect, useRef } from 'react';
function useInterval(callback, delay) {
    var savedCallback = useRef(callback);
    // Remember the latest callback if it changes.
    useLayoutEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(function () {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return;
        }
        var id = setInterval(function () { return savedCallback.current(); }, delay);
        return function () { return clearInterval(id); };
    }, [delay]);
}
export default useInterval;
//# sourceMappingURL=useInterval.js.map
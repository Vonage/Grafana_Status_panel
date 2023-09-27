import { useEffect, useLayoutEffect, useRef } from 'react';
function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    var savedHandler = useRef(handler);
    useLayoutEffect(function () {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(function () {
        // Define the listening target
        var targetElement = (element === null || element === void 0 ? void 0 : element.current) || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        // Create event listener that calls handler function stored in ref
        var eventListener = function (event) { return savedHandler.current(event); };
        targetElement.addEventListener(eventName, eventListener, options);
        // Remove event listener on cleanup
        return function () {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element, options]);
}
export default useEventListener;
//# sourceMappingURL=useEventListener.js.map
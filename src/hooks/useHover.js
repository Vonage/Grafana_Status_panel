import { __read } from "tslib";
import { useState } from 'react';
// See: https://usehooks-ts.com/react-hook/use-event-listener
import useEventListener from 'hooks/useEventListener';
function useHover(elementRef) {
    var _a = __read(useState(false), 2), value = _a[0], setValue = _a[1];
    var handleMouseEnter = function () { return setValue(true); };
    var handleMouseLeave = function () { return setValue(false); };
    useEventListener('mouseenter', handleMouseEnter, elementRef);
    useEventListener('mouseleave', handleMouseLeave, elementRef);
    return value;
}
export default useHover;
//# sourceMappingURL=useHover.js.map
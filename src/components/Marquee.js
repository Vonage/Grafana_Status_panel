import { __assign, __read, __rest } from "tslib";
import React from 'react';
import { useInterval } from 'hooks';
export var ReactMarquee = function (_a) {
    var autoScroll = _a.autoScroll, hover = _a.hover, props = __rest(_a, ["autoScroll", "hover"]);
    var div = React.useRef(null);
    var fps = 30;
    var _b = __read(React.useState(0), 2), y = _b[0], setY = _b[1];
    var _c = __read(React.useState(1), 2), dy = _c[0], setDy = _c[1];
    useInterval(function () {
        if (div.current) {
            if (hover) {
                setY(div.current.parentElement.scrollTop | 0);
            }
            else if (autoScroll) {
                if (0 <= y && y <= div.current.parentElement.scrollHeight - div.current.parentElement.offsetHeight + 1) {
                    div.current.parentElement.scrollTo(0, y);
                    setY(y + dy);
                }
                else {
                    setY(y - dy);
                    setDy(-dy);
                }
            }
        }
    }, 1000 / fps);
    return React.createElement("div", __assign({ ref: div }, props));
};
//# sourceMappingURL=Marquee.js.map
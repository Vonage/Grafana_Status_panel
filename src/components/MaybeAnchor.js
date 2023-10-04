import { __assign } from "tslib";
import React from 'react';
export var MaybeAnchor = function (props) {
    return props.href ? React.createElement("a", __assign({}, props)) : React.createElement(React.Fragment, null, props.children);
};
//# sourceMappingURL=MaybeAnchor.js.map
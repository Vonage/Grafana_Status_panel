import { __assign } from "tslib";
import React from 'react';
import { ColorPicker } from '@grafana/ui';
var defaultColors = {
    crit: "defaultCriticalColor",
    warn: "defaultWarningColor",
    ok: "defaultOkColor",
    disable: "defaultDisableColor"
};
export var StatusColorOptionsEditor = function (_a) {
    var _b = _a.value, value = _b === void 0 ? defaultColors : _b, onChange = _a.onChange;
    var colorPicker = function (colorProps) { return (React.createElement("div", { className: "gf-form" },
        React.createElement(ColorPicker, { color: colorProps.value, onChange: colorProps.onChange }))); };
    var buildHandler = function (prop) { return function (color) {
        var _a;
        onChange(__assign(__assign({}, value), (_a = {}, _a[prop] = color, _a)));
    }; };
    return (React.createElement("div", { className: "gf-form-inline" },
        colorPicker({ value: value.crit || defaultColors.crit, onChange: buildHandler('crit') }),
        colorPicker({ value: value.warn || defaultColors.warn, onChange: buildHandler('warn') }),
        colorPicker({ value: value.ok || defaultColors.ok, onChange: buildHandler('ok') }),
        colorPicker({ value: value.disable || defaultColors.disable, onChange: buildHandler('disable') })));
};
//# sourceMappingURL=StatusColorOptionsEditor.js.map
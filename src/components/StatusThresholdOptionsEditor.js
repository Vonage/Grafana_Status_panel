import { __assign } from "tslib";
import { Input, Label, Select } from '@grafana/ui';
import React from 'react';
var valueHandlerOptions = [
    {
        label: 'Number Threshold',
        value: 'Number Threshold',
        description: 'Change background color of the panel if got warning / error + show the alias of the problematic metrics.',
    },
    {
        label: 'String Threshold',
        value: 'String Threshold',
        description: 'Change background color of the panel if got warning / error + show the alias of the problematic metrics.',
    },
    {
        label: 'Date Threshold',
        value: 'Date Threshold',
        description: 'Change background color of the panel if got warning / error + show the alias of the problematic metrics.',
    },
    {
        label: 'Disable Criteria',
        value: 'Disable Criteria',
        description: 'Change background color of the panel to grey if disabled.',
    },
    {
        label: 'Text Only',
        value: 'Text Only',
        description: 'Show the alias + the value on the panel without any condition.',
    },
];
export var StatusThresholdOptionsEditor = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    if (!value) {
        value = { valueHandler: 'Number Threshold', crit: '90', warn: '70' };
    }
    var inputType;
    if (value.valueHandler === 'Number Threshold') {
        inputType = 'number';
    }
    else if (value.valueHandler === 'String Threshold') {
        inputType = 'text';
    }
    else if (value.valueHandler === 'Date Threshold') {
        inputType = 'datetime-local';
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Select, { value: value.valueHandler, options: valueHandlerOptions, onChange: function (_a) {
                var valueHandler = _a.value;
                return valueHandler && onChange(__assign(__assign({}, value), { valueHandler: valueHandler }));
            } }),
        inputType && (React.createElement(React.Fragment, null,
            React.createElement(Label, null, "Critical Value"),
            React.createElement(Input, { value: value.crit, type: inputType, onChange: function (_a) {
                    var crit = _a.currentTarget.value;
                    return onChange(__assign(__assign({}, value), { crit: crit }));
                } }),
            React.createElement(Label, null, "Warning Value"),
            React.createElement(Input, { value: value.warn, type: inputType, onChange: function (_a) {
                    var warn = _a.currentTarget.value;
                    return onChange(__assign(__assign({}, value), { warn: warn }));
                } })))));
};
//# sourceMappingURL=StatusThresholdOptionsEditor.js.map
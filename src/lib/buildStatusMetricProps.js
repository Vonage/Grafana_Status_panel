import { __assign } from "tslib";
import { formattedValueToString, toFixedUnit, toFixed, dateTimeAsMoment, } from '@grafana/data';
import { css, cx } from 'emotion';
import _ from 'lodash';
export function buildStatusMetricProps(data, fieldConfig, options, colorClasses, replaceVariables, timeZone) {
    var annotations = [];
    var displays = [];
    var crits = [];
    var warns = [];
    var disables = [];
    data.series.forEach(function (df) {
        var _a;
        // find first non-time column
        var field = df.fields.find(function (field) { return field.name !== 'Time'; });
        if (!(field === null || field === void 0 ? void 0 : field.state)) {
            return;
        }
        var config = _.defaultsDeep(__assign({}, field.config), fieldConfig.defaults);
        if (!config.custom) {
            return;
        }
        // determine field status & handle formatting based on value handler
        var fieldStatus = config.custom.displayAliasType === 'Always' ? 'ok' : 'hide';
        var displayValue = '';
        switch (config.custom.thresholds.valueHandler) {
            case 'Number Threshold':
                console.log('Field:', field);
                console.log('Config:', config);
                var value = void 0;
                if (field.state && field.state.calcs && typeof field.state.calcs[config.custom.aggregation] === 'number') {
                    value = field.state.calcs[config.custom.aggregation];
                }
                else {
                    // Handle the scenario where the value is not available.
                    // For example, set a default value or log an error.
                    value = 0; // Or any other default value
                    console.error("Unexpected data structure: field.state.calcs is not defined.");
                }
                // let value: number = field.state.calcs![config.custom.aggregation];
                var crit = +config.custom.thresholds.crit;
                var warn = +config.custom.thresholds.warn;
                if ((warn <= crit && crit <= value) || (warn >= crit && crit >= value)) {
                    fieldStatus = 'crit';
                }
                else if ((warn <= value && value <= crit) || (warn >= value && value >= crit)) {
                    fieldStatus = 'warn';
                }
                if (!_.isFinite(value)) {
                    displayValue = 'Invalid Number';
                }
                else if (config.unit) {
                    displayValue = formattedValueToString(toFixedUnit(config.unit)(value, config.decimals));
                }
                else {
                    displayValue = toFixed(value, config.decimals);
                }
                break;
            case 'String Threshold':
                displayValue = field.state.calcs[config.custom.aggregation];
                if (displayValue === undefined || displayValue === null || displayValue !== displayValue) {
                    displayValue = 'Invalid String';
                }
                if (displayValue === config.custom.thresholds.crit) {
                    fieldStatus = 'crit';
                }
                else if (displayValue === config.custom.thresholds.warn) {
                    fieldStatus = 'warn';
                }
                break;
            case 'Date Threshold':
                var val = field.state.calcs[config.custom.aggregation];
                var date = dateTimeAsMoment(val);
                if (timeZone === 'utc') {
                    date = date.utc();
                }
                displayValue = date.format(config.custom.dateFormat);
                if (val === config.custom.thresholds.crit) {
                    fieldStatus = 'crit';
                }
                else if (val === config.custom.thresholds.warn) {
                    fieldStatus = 'warn';
                }
                break;
            case 'Disable Criteria':
                if (field.state.calcs[config.custom.aggregation] === config.custom.disabledValue) {
                    fieldStatus = 'disable';
                }
                break;
        }
        // only display value when appropriate
        var withAlias = config.custom.displayValueWithAlias;
        var isDisplayValue = withAlias === 'When Alias Displayed' ||
            (fieldStatus === 'warn' && withAlias === 'Warning / Critical') ||
            (fieldStatus === 'crit' && (withAlias === 'Warning / Critical' || withAlias === 'Critical Only'));
        // apply RegEx if value will be displayed
        if (isDisplayValue && config.custom.valueDisplayRegex) {
            try {
                displayValue = displayValue.replace(new RegExp(config.custom.valueDisplayRegex), '');
            }
            catch (_b) { }
        }
        // get first link and interpolate variables
        var link = ((_a = (field.getLinks && field.getLinks({}))) !== null && _a !== void 0 ? _a : [])[0];
        if (link) {
            link.href = replaceVariables(link.href);
        }
        // build props and place in correct bucket
        var props = {
            alias: config.displayName || df.name || df.refId || '',
            displayValue: isDisplayValue ? displayValue : undefined,
            link: link,
        };
        // set font format for field
        if (fieldStatus !== 'ok') {
            if (config.custom.fontFormat === 'Bold') {
                props.className = css({ fontWeight: 'bold' });
            }
            else if (config.custom.fontFormat === 'Italic') {
                props.className = css({ fontStyle: 'italic' });
            }
        }
        // set color for field when colormode is Metric
        if (options.colorMode === 'Metric') {
            props.className = cx(props.className, colorClasses[fieldStatus]);
        }
        // add to appropriate section
        if (fieldStatus === 'ok') {
            if (config.custom.displayType === 'Regular') {
                displays.push(props);
            }
            else {
                annotations.push(props);
            }
        }
        else if (fieldStatus === 'warn') {
            warns.push(props);
        }
        else if (fieldStatus === 'crit') {
            crits.push(props);
        }
        else if (fieldStatus === 'disable') {
            disables.push(props);
        }
    });
    return { annotations: annotations, disables: disables, crits: crits, warns: warns, displays: displays };
}
//# sourceMappingURL=buildStatusMetricProps.js.map
import { __read } from "tslib";
import { IconButton } from '@grafana/ui';
import { css } from 'emotion';
import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { ReactMarquee } from 'components/Marquee';
import { useHover, useInterval } from 'hooks/index';
import { buildStatusMetricProps } from 'lib/buildStatusMetricProps';
import { MaybeAnchor } from './MaybeAnchor';
export var StatusPanel = function (_a) {
    var data = _a.data, options = _a.options, fieldConfig = _a.fieldConfig, width = _a.width, height = _a.height, replaceVariables = _a.replaceVariables, timeZone = _a.timeZone;
    // build styles
    var statusColorClasses = {
        ok: options.isIgnoreOKColors ? '' : css({ color: options.colors.ok }),
        warn: css({ color: options.colors.warn }),
        crit: css({ color: options.colors.crit }),
        disable: css({ color: options.colors.disable }),
        noData: css({ color: options.colors.disable }),
        hide: css({ display: 'none' }),
    };
    // build props
    var _b = buildStatusMetricProps(data, fieldConfig, options, statusColorClasses, replaceVariables, timeZone), annotations = _b.annotations, disables = _b.disables, crits = _b.crits, warns = _b.warns, displays = _b.displays;
    // clear other metrics when disabled and hide on disable
    if (options.isHideAlertsOnDisable && disables.length > 0) {
        crits = warns = displays = [];
    }
    // flatten and slice sections as needed
    var alerts = [disables, crits, warns, displays].flat(1);
    var extraMoreAlerts = null;
    if (0 <= options.maxAlertNumber && options.maxAlertNumber < alerts.length) {
        extraMoreAlerts = alerts.length - options.maxAlertNumber;
        alerts = alerts.slice(0, options.maxAlertNumber);
    }
    // setup flipper
    var _c = __read(React.useState(true), 2), flipped = _c[0], setFlipped = _c[1];
    var wrapper = React.useRef(null);
    var isHover = useHover(wrapper);
    useInterval(function () { return options.flipCard && !isHover && setFlipped(!flipped); }, 1000 * options.flipTime);
    // set panel status and render
    var panelStatus = disables.length
        ? 'disable'
        : crits.length
            ? 'crit'
            : warns.length
                ? 'warn'
                : !data.series.length && options.isGrayOnNoData
                    ? 'noData'
                    : 'ok';
    return (React.createElement("div", { ref: wrapper, className: css({
            width: width,
            height: height,
            boxSizing: 'border-box',
            borderRadius: options.cornerRadius,
            overflow: 'hidden',
            zIndex: 10,
        }, !(panelStatus === 'ok' && options.isIgnoreOKColors) &&
            options.colorMode === 'Panel' && { backgroundColor: options.colors[panelStatus] }) },
        React.createElement(ReactCardFlip, { isFlipped: flipped },
            React.createElement("div", { className: css({
                    width: width,
                    height: height,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                }, options.colorMode === 'Metric' && statusColorClasses[panelStatus]) },
                React.createElement(MaybeAnchor, { href: options.clusterUrl, target: options.clusterTargetBlank ? '_blank' : '_self', title: options.clusterName }, panelStatus === 'crit'
                    ? 'Critical'
                    : panelStatus === 'disable'
                        ? 'Disabled'
                        : panelStatus === 'noData'
                            ? 'No Data'
                            : panelStatus === 'ok'
                                ? 'OK'
                                : 'Warn')),
            React.createElement("div", { className: css({ height: height, display: 'flex', flexDirection: 'column' }) },
                React.createElement("div", { className: css({
                        flex: '1 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }) },
                    React.createElement("div", { className: css({ minHeight: '1px', display: 'flex', justifyContent: 'center', fontSize: '1.5rem' }) },
                        React.createElement(MaybeAnchor, { href: options.clusterUrl, target: options.clusterTargetBlank ? '_blank' : '_self', title: options.clusterName }, replaceVariables(options.clusterName)))),
                React.createElement("div", { className: css({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'scroll',
                        flex: '0 1 auto',
                        '::-webkit-scrollbar': { background: 'transparent', width: '0px', display: 'none' },
                    }) },
                    React.createElement(ReactMarquee, { hover: isHover, autoScroll: options.isAutoScrollOnOverflow },
                        React.createElement("div", null,
                            alerts.map(function (_a) {
                                var alias = _a.alias, link = _a.link, className = _a.className, displayValue = _a.displayValue;
                                return (React.createElement("div", { className: className, style: { color: 'inherit' } },
                                    React.createElement(MaybeAnchor, { href: link === null || link === void 0 ? void 0 : link.href, target: link === null || link === void 0 ? void 0 : link.target, title: alias, style: { color: 'inherit' } }, displayValue ? alias + ' - ' + displayValue : alias)));
                            }),
                            extraMoreAlerts && (React.createElement("span", { className: css({ paddingTop: '2px', fontSize: '0.85rem' }) },
                                "+ ",
                                extraMoreAlerts,
                                " more"))))),
                React.createElement("div", { className: css({ fontSize: '1.5rem', minHeight: '1px', flex: '1 1 0' }) }),
                React.createElement("div", { className: css({
                        position: 'absolute',
                        height: height,
                        overflow: 'scroll',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        '::-webkit-scrollbar': { background: 'transparent', width: '0px', display: 'none' },
                    }) },
                    React.createElement(ReactMarquee, { hover: isHover, autoScroll: options.isAutoScrollOnOverflow },
                        React.createElement("div", { className: css({ fontSize: '0.85rem' }) }, annotations.map(function (_a) {
                            var alias = _a.alias, link = _a.link, className = _a.className, displayValue = _a.displayValue;
                            return (React.createElement("div", { className: className, style: { color: 'inherit' } },
                                React.createElement(MaybeAnchor, { href: link === null || link === void 0 ? void 0 : link.href, target: link === null || link === void 0 ? void 0 : link.target, title: alias, style: { color: 'inherit' } }, displayValue ? alias + ' - ' + displayValue : alias)));
                        })))))),
        isHover && (React.createElement(IconButton, { name: 'exchange-alt', onClick: function () { return setFlipped(!flipped); }, className: css({ position: 'absolute', bottom: '2rem', right: '2rem' }) }))));
};
//# sourceMappingURL=StatusPanel.js.map
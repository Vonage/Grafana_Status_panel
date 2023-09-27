var isAngularModel = function (panel) { return !!panel.options && 'clusterName' in panel; };
export var statusMigrationHandler = function (panel) {
    if (isAngularModel(panel)) {
        var clusterLink = panel.links[0];
        var options = {
            clusterName: panel.clusterName,
            clusterUrl: clusterLink === null || clusterLink === void 0 ? void 0 : clusterLink.url,
            clusterTargetBlank: !!(clusterLink === null || clusterLink === void 0 ? void 0 : clusterLink.targetBlank),
            namePrefix: panel.namePrefix,
            maxAlertNumber: panel.maxAlertNumber,
            cornerRadius: "".concat(panel.cornerRadius, "%"),
            flipCard: panel.flipCard,
            flipTime: panel.flipTime,
            colorMode: panel.colorMode,
            colors: panel.colors,
            isAutoScrollOnOverflow: panel.isAutoScrollOnOverflow,
            isGrayOnNoData: panel.isGrayOnNoData,
            isIgnoreOKColors: panel.isIgnoreOKColors,
            isHideAlertsOnDisable: panel.isHideAlertsOnDisable,
        };
        return options;
    }
    else {
        return {};
    }
};
//# sourceMappingURL=statusMigrationHandler.js.map
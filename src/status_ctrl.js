import {MetricsPanelCtrl} from "app/plugins/sdk";
import "app/plugins/panel/graph/legend";
import "app/plugins/panel/graph/series_overrides_ctrl";
import _ from "lodash";
import TimeSeries from "app/core/time_series2";
import coreModule from "app/core/core_module"

import './css/status_panel.css!';

export class StatusPluginCtrl extends MetricsPanelCtrl {
	/** @ngInject */
	constructor($scope, $injector, $log, $filter, annotationsSrv) {
		super($scope, $injector);

		//this.log = $log.debug;
		this.filter = $filter;

		this.displayTypes = ['Threshold', 'Disable Criteria', 'Annotation'];
		this.aggregations = ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg'];

		/** Bind events to functions **/
		this.events.on('render', this.onRender.bind(this));
		this.events.on('refresh', this.postRefresh.bind(this));
		this.events.on('data-error', this.onDataError.bind(this));
		this.events.on('data-received', this.onDataReceived.bind(this));
		this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
		this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
	}

	postRefresh() {
		if (this.panel.fixedSpan) {
			this.panel.span = this.panel.fixedSpan;
		}

		this.measurements = this.panel.targets;

		/** Duplicate alias validation **/
		this.duplicates = false;

		this.measurements = _.filter(this.measurements, (measurement) => {
			return !measurement.hide;
		});

		_.each(this.measurements, (m) => {
			let res = _.filter(this.measurements, (measurement) => {
				return (m.alias == measurement.alias || (m.target == measurement.target && m.target)) && !m.hide;
			});

			if (res.length > 1) {
				this.duplicates = true;
			}
		});
	}

	onInitEditMode() {
		this.addEditorTab('Options', 'public/plugins/vonage-status-panel/editor.html', 2);
	}

	setElementHeight() {
		this.$panelContainer.find('.status-panel').css('height', this.$panelContoller.height + 'px');
	}

	onRender() {
		this.setElementHeight();

		if (this.panel.clusterName) {
			this.panel.displayName =
				this.filter('interpolateTemplateVars')(this.panel.clusterName, this.$scope)
					.replace(new RegExp(this.panel.namePrefix, 'i'), '');
		} else {
			this.panel.displayName = "";
		}



		let targets = this.panel.targets;

		this.crit = [];
		this.warn = [];
		this.display = [];
		this.disabled = [];
		this.annotation = [];

		_.each(this.series, (s) => {
			let target = _.find(targets, (target) => {
				return target.alias == s.alias || target.target == s.alias;
			});

			if (!target) {
				return;
			}

			s.alias = target.alias;
			s.url = target.url;

			let value;
			switch (target.aggregation) {
				case 'Max':
					value = _.max(s.datapoints, (point) => { return point[0]; })[0];
					value = s.stats.max;
					break;
				case 'Min':
					value = _.min(s.datapoints, (point) => { return point[0]; })[0];
					value = s.stats.min;
					break;
				case 'Sum':
					value = 0;
					_.each(s.datapoints, (point) => { value += point[0] });
					value = s.stats.total;
					break;
				case 'Avg':
					value = s.stats.avg;
					break;
				case 'First':
					value = s.datapoints[0][0];
					break;
				default:
					value = s.datapoints[s.datapoints.length - 1][0];
			}

			s.display_value = value;

			if (target.displayType == "Threshold") {
				this.handleThresholdStatus(s, target);
			}
			else if (target.displayType == "Disable Criteria") {
				this.handleDisabledStatus(s,target);
			}
			else if (target.displayType == "Annotation") {
				this.handleAnnotations(s, target);
			}
		});

		this.handle_css_display();
		this.parseUri();
	}

	handleThresholdStatus(series, target) {
		series.thresholds = StatusPluginCtrl.parseThresholds(target);
		series.inverted = series.thresholds.crit < series.thresholds.warn;
		series.display = target.display;

		if (!series.inverted) {
			if (series.display_value >= series.thresholds.crit) {
				this.crit.push(series);
			} else if (series.display_value >= series.thresholds.warn) {
				this.warn.push(series);
			} else if (series.display) {
				this.display.push(series);
			}
		} else {
			if (series.display_value <= series.thresholds.crit) {
				this.crit.push(series);
			} else if (series.display_value <= series.thresholds.warn) {
				this.warn.push(series);
			} else if (series.display) {
				this.display.push(series);
			}
		}
	}

	handleDisabledStatus(series, target) {

		series.disabledValue = target.disabledValue;

		if (series.display_value == series.disabledValue) {
			this.disabled.push(series);
		}
	}

	handleAnnotations(series, target) {
		this.annotation.push(series);
	}

	handle_css_display() {
		this.$panelContainer.removeClass('error-state warn-state disabled-state ok-state no-data-state');

		if(this.duplicates) {
			this.$panelContainer.addClass('error-state');
		} else if (this.disabled.length > 0) {
			this.$panelContainer.addClass('disabled-state');
		} else if (this.crit.length > 0) {
			this.$panelContainer.addClass('error-state');
		} else if (this.warn.length > 0) {
			this.$panelContainer.addClass('warn-state');
		} else if((this.series == undefined || this.series.length == 0) && this.panel.isGrayOnNoData) {
			this.$panelContainer.addClass('no-data-state');
		} else {
			this.$panelContainer.addClass('ok-state');
		}
	}

	parseUri() {
		if (this.panel.links && this.panel.links.length > 0) {
			this.uri = this.panel.links[0].dashUri + "?" + this.panel.links[0].params;
		} else {
			this.uri = undefined;
		}
	}

	static parseThresholds(metricOptions) {
		let res = {};

		res.warn = metricOptions.warn;
		res.crit = metricOptions.crit;

		return res;
	}

	onDataReceived(dataList) {
		this.series = dataList.map(this.seriesHandler.bind(this));

		this.render();
	}

	onDataError() {
		this.crit = [];
		this.warn = [];
	}

	seriesHandler(seriesData) {
		var series = new TimeSeries({
			datapoints: seriesData.datapoints,
			alias: seriesData.target
		});

		series.flotpairs = series.getFlotPairs("connected");

		return series;
	}

	link(scope, elem, attrs, ctrl) {
		this.$panelContainer = elem.find('.panel-container');
		this.$panelContoller = ctrl;
	}
}

StatusPluginCtrl.templateUrl = 'module.html';

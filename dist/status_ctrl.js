"use strict";

System.register(["app/plugins/sdk", "app/plugins/panel/graph/legend", "app/plugins/panel/graph/series_overrides_ctrl", "lodash", "app/core/time_series2", "app/core/core_module", "./css/status_panel.css!"], function (_export, _context) {
	"use strict";

	var MetricsPanelCtrl, _, TimeSeries, coreModule, _createClass, StatusPluginCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	return {
		setters: [function (_appPluginsSdk) {
			MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
		}, function (_appPluginsPanelGraphLegend) {}, function (_appPluginsPanelGraphSeries_overrides_ctrl) {}, function (_lodash) {
			_ = _lodash.default;
		}, function (_appCoreTime_series) {
			TimeSeries = _appCoreTime_series.default;
		}, function (_appCoreCore_module) {
			coreModule = _appCoreCore_module.default;
		}, function (_cssStatus_panelCss) {}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export("StatusPluginCtrl", StatusPluginCtrl = function (_MetricsPanelCtrl) {
				_inherits(StatusPluginCtrl, _MetricsPanelCtrl);

				/** @ngInject */
				function StatusPluginCtrl($scope, $injector, $log, $filter, annotationsSrv) {
					_classCallCheck(this, StatusPluginCtrl);

					var _this = _possibleConstructorReturn(this, (StatusPluginCtrl.__proto__ || Object.getPrototypeOf(StatusPluginCtrl)).call(this, $scope, $injector));

					//this.log = $log.debug;
					_this.filter = $filter;

					_this.displayTypes = ['Threshold', 'Disable Criteria', 'Annotation'];
					_this.aggregations = ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg'];

					/** Bind events to functions **/
					_this.events.on('render', _this.onRender.bind(_this));
					_this.events.on('refresh', _this.postRefresh.bind(_this));
					_this.events.on('data-error', _this.onDataError.bind(_this));
					_this.events.on('data-received', _this.onDataReceived.bind(_this));
					_this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
					_this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
					return _this;
				}

				_createClass(StatusPluginCtrl, [{
					key: "postRefresh",
					value: function postRefresh() {
						var _this2 = this;

						if (this.panel.fixedSpan) {
							this.panel.span = this.panel.fixedSpan;
						}

						this.measurements = this.panel.targets;

						/** Duplicate alias validation **/
						this.duplicates = false;

						this.measurements = _.filter(this.measurements, function (measurement) {
							return !measurement.hide;
						});

						_.each(this.measurements, function (m) {
							var res = _.filter(_this2.measurements, function (measurement) {
								return (m.alias == measurement.alias || m.target == measurement.target && m.target) && !m.hide;
							});

							if (res.length > 1) {
								_this2.duplicates = true;
							}
						});
					}
				}, {
					key: "onInitEditMode",
					value: function onInitEditMode() {
						this.addEditorTab('Options', 'public/plugins/vonage-status-panel/editor.html', 2);
					}
				}, {
					key: "setElementHeight",
					value: function setElementHeight() {
						this.$panelContainer.find('.status-panel').css('height', this.$panelContoller.height + 'px');
					}
				}, {
					key: "onRender",
					value: function onRender() {
						var _this3 = this;

						this.setElementHeight();

						if (this.panel.clusterName) {
							this.panel.displayName = this.filter('interpolateTemplateVars')(this.panel.clusterName, this.$scope).replace(new RegExp(this.panel.namePrefix, 'i'), '');
						} else {
							this.panel.displayName = "";
						}

						var targets = this.panel.targets;

						this.crit = [];
						this.warn = [];
						this.display = [];
						this.disabled = [];
						this.annotation = [];

						_.each(this.series, function (s) {
							var target = _.find(targets, function (target) {
								return target.alias == s.alias || target.target == s.alias;
							});

							if (!target) {
								return;
							}

							s.alias = target.alias;
							s.url = target.url;

							var value = void 0;
							switch (target.aggregation) {
								case 'Max':
									value = _.max(s.datapoints, function (point) {
										return point[0];
									})[0];
									value = s.stats.max;
									break;
								case 'Min':
									value = _.min(s.datapoints, function (point) {
										return point[0];
									})[0];
									value = s.stats.min;
									break;
								case 'Sum':
									value = 0;
									_.each(s.datapoints, function (point) {
										value += point[0];
									});
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
								_this3.handleThresholdStatus(s, target);
							} else if (target.displayType == "Disable Criteria") {
								_this3.handleDisabledStatus(s, target);
							} else if (target.displayType == "Annotation") {
								_this3.handleAnnotations(s, target);
							}
						});

						this.handle_css_display();
						this.parseUri();
					}
				}, {
					key: "handleThresholdStatus",
					value: function handleThresholdStatus(series, target) {
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
				}, {
					key: "handleDisabledStatus",
					value: function handleDisabledStatus(series, target) {

						series.disabledValue = target.disabledValue;

						if (series.display_value == series.disabledValue) {
							this.disabled.push(series);
						}
					}
				}, {
					key: "handleAnnotations",
					value: function handleAnnotations(series, target) {
						this.annotation.push(series);
					}
				}, {
					key: "handle_css_display",
					value: function handle_css_display() {
						this.$panelContainer.removeClass('error-state warn-state disabled-state ok-state no-data-state');

						if (this.duplicates) {
							this.$panelContainer.addClass('error-state');
						} else if (this.disabled.length > 0) {
							this.$panelContainer.addClass('disabled-state');
						} else if (this.crit.length > 0) {
							this.$panelContainer.addClass('error-state');
						} else if (this.warn.length > 0) {
							this.$panelContainer.addClass('warn-state');
						} else if ((this.series == undefined || this.series.length == 0) && this.panel.isGrayOnNoData) {
							this.$panelContainer.addClass('no-data-state');
						} else {
							this.$panelContainer.addClass('ok-state');
						}
					}
				}, {
					key: "parseUri",
					value: function parseUri() {
						if (this.panel.links && this.panel.links.length > 0) {
							this.uri = this.panel.links[0].dashUri + "?" + this.panel.links[0].params;
						} else {
							this.uri = undefined;
						}
					}
				}, {
					key: "onDataReceived",
					value: function onDataReceived(dataList) {
						this.series = dataList.map(this.seriesHandler.bind(this));

						this.render();
					}
				}, {
					key: "onDataError",
					value: function onDataError() {
						this.crit = [];
						this.warn = [];
					}
				}, {
					key: "seriesHandler",
					value: function seriesHandler(seriesData) {
						var series = new TimeSeries({
							datapoints: seriesData.datapoints,
							alias: seriesData.target
						});

						series.flotpairs = series.getFlotPairs("connected");

						return series;
					}
				}, {
					key: "link",
					value: function link(scope, elem, attrs, ctrl) {
						this.$panelContainer = elem.find('.panel-container');
						this.$panelContoller = ctrl;
					}
				}], [{
					key: "parseThresholds",
					value: function parseThresholds(metricOptions) {
						var res = {};

						res.warn = metricOptions.warn;
						res.crit = metricOptions.crit;

						return res;
					}
				}]);

				return StatusPluginCtrl;
			}(MetricsPanelCtrl));

			_export("StatusPluginCtrl", StatusPluginCtrl);

			StatusPluginCtrl.templateUrl = 'module.html';
		}
	};
});
//# sourceMappingURL=status_ctrl.js.map

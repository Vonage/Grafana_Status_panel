"use strict";

System.register(["app/plugins/sdk", "lodash", "app/core/time_series2", "app/core/core_module", "app/core/utils/kbn", "moment", "./css/status_panel.css!"], function (_export, _context) {
	"use strict";

	var MetricsPanelCtrl, _, TimeSeries, coreModule, kbn, moment, _createClass, panelDefaults, StatusPluginCtrl;

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
		}, function (_lodash) {
			_ = _lodash.default;
		}, function (_appCoreTime_series) {
			TimeSeries = _appCoreTime_series.default;
		}, function (_appCoreCore_module) {
			coreModule = _appCoreCore_module.default;
		}, function (_appCoreUtilsKbn) {
			kbn = _appCoreUtilsKbn.default;
		}, function (_moment) {
			moment = _moment.default;
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

			panelDefaults = {
				flipCard: false,
				flipTime: 5,
				colorMode: 'Panel',
				// Changed colors to match Table Panel so colorised text is easier to read
				colors: {
					crit: 'rgba(245, 54, 54, 0.9)',
					warn: 'rgba(237, 129, 40, 0.9)',
					ok: 'rgba(50, 128, 45, 0.9)',
					disable: 'rgba(128, 128, 128, 0.9)'
				},
				isGrayOnNoData: false,
				isIgnoreOKColors: false,
				isHideAlertsOnDisable: false,
				cornerRadius: 0,
				isAutoScrollOnOverflow: false
			};

			_export("StatusPluginCtrl", StatusPluginCtrl = function (_MetricsPanelCtrl) {
				_inherits(StatusPluginCtrl, _MetricsPanelCtrl);

				/** @ngInject */
				function StatusPluginCtrl($scope, $injector, $log, $filter, annotationsSrv) {
					_classCallCheck(this, StatusPluginCtrl);

					var _this = _possibleConstructorReturn(this, (StatusPluginCtrl.__proto__ || Object.getPrototypeOf(StatusPluginCtrl)).call(this, $scope, $injector));

					_.defaultsDeep(_this.panel, panelDefaults);

					//this.log = $log.debug;
					_this.filter = $filter;

					_this.valueHandlers = ['Number Threshold', 'String Threshold', 'Date Threshold', 'Disable Criteria', 'Text Only'];
					_this.aggregations = ['Last', 'First', 'Max', 'Min', 'Sum', 'Avg', 'Delta'];
					_this.displayTypes = ['Regular', 'Annotation'];
					_this.displayAliasTypes = ['Warning / Critical', 'Always'];
					_this.displayValueTypes = ['Never', 'When Alias Displayed', 'Warning / Critical', 'Critical Only'];
					_this.colorModes = ['Panel', 'Metric', 'Disabled'];
					_this.fontFormats = ['Regular', 'Bold', 'Italic'];

					// Dates get stored as strings and will need to be converted back to a Date objects
					_.each(_this.panel.targets, function (t) {
						if (t.valueHandler === "Date Threshold") {
							if (typeof t.crit != "undefined") t.crit = new Date(t.crit);
							if (typeof t.warn != "undefined") t.warn = new Date(t.warn);
						}
					});

					_this.panel.flipTime = _this.panel.flipTime || 5;

					/** Bind events to functions **/
					_this.events.on('render', _this.onRender.bind(_this));
					_this.events.on('refresh', _this.postRefresh.bind(_this));
					_this.events.on('data-error', _this.onDataError.bind(_this));
					_this.events.on('data-received', _this.onDataReceived.bind(_this));
					_this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
					_this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));

					_this.onColorChange = _this.onColorChange.bind(_this);

					_this.addFilters();
					return _this;
				}

				_createClass(StatusPluginCtrl, [{
					key: "addFilters",
					value: function addFilters() {
						var _this2 = this;

						coreModule.filter('numberOrText', function () {
							var numberOrTextFilter = function numberOrTextFilter(input) {
								if (angular.isNumber(input)) {
									return _this2.filter('number')(input);
								} else {
									return input;
								}
							};

							numberOrTextFilter.$stateful = true;
							return numberOrTextFilter;
						});

						coreModule.filter('numberOrTextWithRegex', function () {
							var numberOrTextFilter = function numberOrTextFilter(input, textRegex) {
								if (angular.isNumber(input)) {
									return _this2.filter('number')(input);
								} else {
									if (textRegex == null || textRegex.length == 0) {
										return input;
									} else {
										var regex = void 0;

										try {
											regex = new RegExp(textRegex);
										} catch (e) {
											return input;
										}

										if (!input) {
											return input;
										}

										var matchResults = input.match(regex);
										if (matchResults == null) {
											return input;
										} else {
											return matchResults[0];
										}
									}
								}
							};

							numberOrTextFilter.$stateful = true;
							return numberOrTextFilter;
						});
					}
				}, {
					key: "postRefresh",
					value: function postRefresh() {
						var _this3 = this;

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
							var res = _.filter(_this3.measurements, function (measurement) {
								return (m.alias == measurement.alias || m.target == measurement.target && m.target) && !m.hide;
							});

							if (res.length > 1) {
								_this3.duplicates = true;
							}
						});
					}
				}, {
					key: "onInitEditMode",
					value: function onInitEditMode() {
						this.addEditorTab('Options', 'public/plugins/vonage-status-panel/editor.html', 2);
						// Load in the supported units-of-measure formats so they can be displayed in the editor
						this.unitFormats = kbn.getUnitFormats();
					}
				}, {
					key: "setUnitFormat",
					value: function setUnitFormat(measurement, subItem) {
						measurement.units = subItem.value;
						this.render();
					}
				}, {
					key: "fixPanelHeader",
					value: function fixPanelHeader() {
						// Handle the panel top menu height, since it's display doesn't look good with the panel
						var panelHeaderHeight = '';
						if (this.panel.title.length === 0) {
							panelHeaderHeight = '10px';
						}
						this.$panelContainer.find('.panel-header').css('height', panelHeaderHeight);
						this.$panelContainer.find('.panel-menu-container').css('height', panelHeaderHeight);
						this.$panelContainer.find('.fa-caret-down').css('display', 'none');
					}
				}, {
					key: "setElementHeight",
					value: function setElementHeight() {
						// Handle the panel height
						this.$panelContainer.find('.status-panel').css('min-height', this.$panelContoller.height + 'px');
						this.minHeight = this.$panelContoller.height - 10;
					}
				}, {
					key: "setTextMaxWidth",
					value: function setTextMaxWidth() {
						var tail = ' …';
						var panelWidth = this.$panelContainer.innerWidth();
						if (isNaN(panelWidth)) panelWidth = parseInt(panelWidth.slice(0, -2), 10) / 12;
						panelWidth = panelWidth - 20;
						this.maxWidth = panelWidth;
					}
				}, {
					key: "isAutoScrollAlerts",
					value: function isAutoScrollAlerts() {
						if (!this.panel.isAutoScrollOnOverflow) {
							return false;
						}

						var element = this.$panelContainer.find('.status-panel')[0];
						var overflowY = element.offsetHeight < element.scrollHeight;
						return overflowY;
					}
				}, {
					key: "onHandlerChange",
					value: function onHandlerChange(measurement) {
						// If the Threshold type changes between Number/String/Date then try and recast the thresholds to keep consistent
						if (measurement.valueHandler === "Number Threshold") {
							measurement.crit = isNaN(Number(measurement.crit)) ? undefined : Number(measurement.crit);
							measurement.warn = isNaN(Number(measurement.warn)) ? undefined : Number(measurement.warn);
						} else if (measurement.valueHandler === "String Threshold") {
							if (typeof measurement.crit != "undefined") measurement.crit = String(measurement.crit);
							if (typeof measurement.warn != "undefined") measurement.warn = String(measurement.warn);
						} else if (measurement.valueHandler === "Date Threshold") {
							var c = new Date(measurement.crit),
							    w = new Date(measurement.warn);
							measurement.crit = isNaN(c.getTime()) ? undefined : c;
							measurement.warn = isNaN(w.getTime()) ? undefined : w;
						}
						this.onRender();
					}
				}, {
					key: "onColorChange",
					value: function onColorChange(item) {
						var _this4 = this;

						return function (color) {
							_this4.panel.colors[item] = color;
							_this4.render();
						};
					}
				}, {
					key: "onRender",
					value: function onRender() {
						var _this5 = this;

						this.fixPanelHeader();
						this.setElementHeight();
						this.setTextMaxWidth();
						this.upgradeOldVersion();

						if (this.panel.clusterName) {
							this.panel.displayName = this.filter('interpolateTemplateVars')(this.panel.clusterName, this.$scope).replace(new RegExp(this.panel.namePrefix, 'i'), '');
						} else {
							this.panel.displayName = "";
						}

						if (this.panel.flipCard) {
							this.$panelContainer.addClass("effect-hover");
						} else {
							this.$panelContainer.removeClass("effect-hover");
						}

						var targets = this.panel.targets;

						this.crit = [];
						this.warn = [];
						this.disabled = [];
						this.display = [];
						this.annotation = [];
						this.extraMoreAlerts = null;

						_.each(this.series, function (s) {
							if (s.datapoints.length === 0) {
								return;
							}

							var target = _.find(targets, function (target) {
								return target.alias == s.alias || target.target == s.alias;
							});

							if (!target) {
								return;
							}

							s.alias = target.alias;
							s.url = target.url;
							s.isDisplayValue = true;
							s.displayType = target.displayType;
							s.valueDisplayRegex = "";

							if (_this5.validateRegex(target.valueDisplayRegex)) {
								s.valueDisplayRegex = target.valueDisplayRegex;
							}

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
								case 'Delta':
									value = s.datapoints[s.datapoints.length - 1][0] - s.datapoints[0][0];
									value = s.stats.diff;
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

							if (target.valueHandler == "Number Threshold" || target.valueHandler == "String Threshold" || target.valueHandler == "Date Threshold") {
								_this5.handleThresholdStatus(s, target);
							} else if (target.valueHandler == "Disable Criteria") {
								_this5.handleDisabledStatus(s, target);
							} else if (target.valueHandler == "Text Only") {
								_this5.handleTextOnly(s, target);
							}
						});

						if (this.panel.isHideAlertsOnDisable && this.disabled.length > 0) {
							this.crit = [];
							this.warn = [];
							this.display = [];
						}

						this.autoFlip();
						this.updatePanelState();
						this.handleCssDisplay();
						this.parseUri();

						//This must appear after handling the css style of the panel
						this.handleMaxAlertsToShow();

						//Calling postRefresh will ensure the measurements are set on the initial render
						this.postRefresh();
					}
				}, {
					key: "upgradeOldVersion",
					value: function upgradeOldVersion() {
						var _this6 = this;

						var targets = this.panel.targets;

						//Handle legacy code
						_.each(targets, function (target) {
							if (target.valueHandler == null) {
								if (target.displayType != null) {
									target.valueHandler = target.displayType;
									if (target.valueHandler == "Annotation") {
										target.valueHandler = "Text Only";
									}
								} else {
									target.valueHandler = _this6.valueHandlers[0];
								}
								target.displayType = _this6.displayTypes[0];
							}

							if (target.display != null) {
								target.displayAliasType = target.display ? "Always" : _this6.displayAliasTypes[0];
								target.displayValueWithAlias = target.display ? 'When Alias Displayed' : _this6.displayValueTypes[0];
								delete target.display;
							}
						});

						// Depreciate Threshold in favour of Type specific versions
						_.each(targets, function (target) {
							if (target.valueHandler === "Threshold") {
								// Use the same logic as Threshold Parsing to ensure we retain same behaviour
								// i.e. map to Number Threshold if two floats (i.e. range check) otherwise map to String Threshold (i.e. exact match)
								if (StatusPluginCtrl.isFloat(target.crit) && StatusPluginCtrl.isFloat(target.warn)) {
									target.valueHandler = "Number Threshold";
									target.crit = Number(target.crit);
									target.warn = Number(target.warn);
								} else {
									target.valueHandler = "String Threshold";
									if (typeof target.crit != "undefined") target.crit = String(target.crit);
									if (typeof target.warn != "undefined") target.warn = String(target.warn);
								}
							}
						});
					}
				}, {
					key: "handleThresholdStatus",
					value: function handleThresholdStatus(series, target) {
						series.thresholds = StatusPluginCtrl.parseThresholds(target);
						series.inverted = series.thresholds.crit < series.thresholds.warn;

						var isCritical = false;
						var isWarning = false;
						var isCheckRanges = series.thresholds.warnIsNumber && series.thresholds.critIsNumber;
						if (isCheckRanges) {
							if (!series.inverted) {
								if (series.display_value >= series.thresholds.crit) {
									isCritical = true;
								} else if (series.display_value >= series.thresholds.warn) {
									isWarning = true;
								}
							} else {
								if (series.display_value <= series.thresholds.crit) {
									isCritical = true;
								} else if (series.display_value <= series.thresholds.warn) {
									isWarning = true;
								}
							}
						} else {
							if (series.display_value == series.thresholds.crit) {
								isCritical = true;
							} else if (series.display_value == series.thresholds.warn) {
								isWarning = true;
							}
						}

						// Add units-of-measure and decimal formatting or date formatting as needed
						series.display_value = this.formatDisplayValue(series.display_value, target);

						var displayValueWhenAliasDisplayed = 'When Alias Displayed' === target.displayValueWithAlias;
						var displayValueFromWarning = 'Warning / Critical' === target.displayValueWithAlias;
						var displayValueFromCritical = 'Critical Only' === target.displayValueWithAlias;

						if (isCritical) {
							//In critical state we don't show the error as annotation
							series.displayType = this.displayTypes[0];
							series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning || displayValueFromCritical;
							this.crit.push(series);
						} else if (isWarning) {
							//In warning state we don't show the warning as annotation
							series.displayType = this.displayTypes[0];
							series.isDisplayValue = displayValueWhenAliasDisplayed || displayValueFromWarning;
							this.warn.push(series);
						} else if ("Always" == target.displayAliasType) {
							series.isDisplayValue = displayValueWhenAliasDisplayed;
							if (series.displayType == "Annotation") {
								this.annotation.push(series);
							} else {
								this.display.push(series);
							}
						}
					}
				}, {
					key: "formatDisplayValue",
					value: function formatDisplayValue(value, target) {
						// Format the display value. Set to "Invalid" if value is out-of-bounds or a type mismatch with the handler
						if (target.valueHandler === "Number Threshold") {
							if (_.isFinite(value)) {
								var units = typeof target.units === "string" ? target.units : 'none';
								var decimals = this.decimalPlaces(value);
								// We define the decimal percision by the minimal decimal needed
								decimals = typeof target.decimals === "number" ? Math.min(target.decimals, decimals) : decimals;
								value = kbn.valueFormats[units](value, decimals, null);
							} else {
								value = "Invalid Number";
							}
						} else if (target.valueHandler === "String Threshold") {
							if (value === undefined || value === null || value !== value) value = "Invalid String";
						} else if (target.valueHandler === "Date Threshold") {
							if (_.isFinite(value)) {
								var date = moment(new Date(value));
								if (this.dashboard.isTimezoneUtc()) date = date.utc();
								value = date.format(target.dateFormat);
							} else {
								value = "Invalid Date";
							}
						}
						return value;
					}
				}, {
					key: "decimalPlaces",
					value: function decimalPlaces(num) {
						var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
						if (!match) {
							return 0;
						}
						return Math.max(0,
						// Number of digits right of decimal point.
						(match[1] ? match[1].length : 0) - (
						// Adjust for scientific notation.
						match[2] ? +match[2] : 0));
					}
				}, {
					key: "handleDisabledStatus",
					value: function handleDisabledStatus(series, target) {
						series.displayType = this.displayTypes[0];
						series.disabledValue = target.disabledValue;

						if (series.display_value == series.disabledValue) {
							this.disabled.push(series);
						}
					}
				}, {
					key: "handleTextOnly",
					value: function handleTextOnly(series, target) {
						if (series.displayType == "Annotation") {
							this.annotation.push(series);
						} else {
							this.display.push(series);
						}
					}
				}, {
					key: "updatePanelState",
					value: function updatePanelState() {
						if (this.duplicates) {
							this.panelState = 'error-state';
						} else if (this.disabled.length > 0) {
							this.panelState = 'disabled-state';
						} else if (this.crit.length > 0) {
							this.panelState = 'error-state';
						} else if (this.warn.length > 0) {
							this.panelState = 'warn-state';
						} else if ((this.series == undefined || this.series.length == 0) && this.panel.isGrayOnNoData) {
							this.panelState = 'no-data-state';
						} else {
							this.panelState = 'ok-state';
						}
					}
				}, {
					key: "handleCssDisplay",
					value: function handleCssDisplay() {
						this.$panelContainer.removeClass('error-state warn-state disabled-state ok-state no-data-state');
						this.$panelContainer.addClass(this.panelState);

						var radius = _.isNumber(this.panel.cornerRadius) ? this.panel.cornerRadius : 0;
						this.$panelContainer.css('border-radius', radius + '%');

						var okColor = this.panel.isIgnoreOKColors ? '' : this.panel.colors.ok;

						if (this.panel.colorMode === "Panel") {
							switch (this.panelState) {
								case 'disabled-state':
									this.$panelContainer.css('background-color', this.panel.colors.disable);break;
								case 'error-state':
									this.$panelContainer.css('background-color', this.panel.colors.crit);break;
								case 'warn-state':
									this.$panelContainer.css('background-color', this.panel.colors.warn);break;
								case 'no-data-state':
									this.$panelContainer.css('background-color', this.panel.colors.disable);break;
								default:
									this.$panelContainer.css('background-color', okColor);break;
							}
						} else {
							this.$panelContainer.css('background-color', '');
						}
					}
				}, {
					key: "handleMaxAlertsToShow",
					value: function handleMaxAlertsToShow() {
						var _this7 = this;

						if (this.panel.maxAlertNumber != null && this.panel.maxAlertNumber >= 0) {
							var currentMaxAllowedAlerts = this.panel.maxAlertNumber;
							var filteredOutAlerts = 0;
							var arrayNamesToSlice = ["disabled", "crit", "warn", "display"];
							arrayNamesToSlice.forEach(function (arrayName) {
								var originAlertCount = _this7[arrayName].length;
								_this7[arrayName] = _this7[arrayName].slice(0, currentMaxAllowedAlerts);
								currentMaxAllowedAlerts = Math.max(currentMaxAllowedAlerts - _this7[arrayName].length, 0);
								filteredOutAlerts += originAlertCount - _this7[arrayName].length;
							});

							if (filteredOutAlerts > 0) {
								this.extraMoreAlerts = "+ " + filteredOutAlerts + " more";
							}
						}
					}
				}, {
					key: "parseUri",
					value: function parseUri() {
						if (this.panel.links && this.panel.links.length > 0) {
							var link = this.panel.links[0];
							this.uri = link.url;
							this.targetBlank = link.targetBlank;
						} else {
							this.uri = undefined;
						}
					}
				}, {
					key: "validateRegex",
					value: function validateRegex(textRegex) {
						if (textRegex == null || textRegex.length == 0) {
							return true;
						}
						try {
							var regex = new RegExp(textRegex);
							return true;
						} catch (e) {
							return false;
						}
					}
				}, {
					key: "onDataReceived",
					value: function onDataReceived(dataList) {
						this.series = dataList.map(StatusPluginCtrl.seriesHandler.bind(this));
						this.render();
					}
				}, {
					key: "onDataError",
					value: function onDataError() {
						this.crit = [];
						this.warn = [];
					}
				}, {
					key: "$onDestroy",
					value: function $onDestroy() {
						if (this.timeoutId) clearInterval(this.timeoutId);
					}
				}, {
					key: "autoFlip",
					value: function autoFlip() {
						var _this8 = this;

						if (this.timeoutId) clearInterval(this.timeoutId);
						if (this.panel.flipCard && (this.crit.length > 0 || this.warn.length > 0 || this.disabled.length > 0)) {
							this.timeoutId = setInterval(function () {
								_this8.$panelContainer.toggleClass("flipped");
							}, this.panel.flipTime * 1000);
						}
					}
				}, {
					key: "link",
					value: function link(scope, elem, attrs, ctrl) {
						if (elem.find('.panel-container').length === 1) {
							this.$panelContainer = elem.find('.panel-container');
						} else {
							this.$panelContainer = elem;
						}
						this.$panelContainer.addClass("st-card");
						this.$panelContoller = ctrl;
					}
				}], [{
					key: "parseThresholds",
					value: function parseThresholds(metricOptions) {
						var res = {};

						if (StatusPluginCtrl.isFloat(metricOptions.warn)) {
							res.warn = parseFloat(metricOptions.warn);
							res.warnIsNumber = true;
						} else if (metricOptions.warn instanceof Date) {
							// Convert Dates to Numbers and leverage existing threshold logic
							res.warn = metricOptions.warn.valueOf();
							res.warnIsNumber = true;
						} else {
							res.warn = metricOptions.warn;
							res.warnIsNumber = false;
						}

						if (StatusPluginCtrl.isFloat(metricOptions.crit)) {
							res.crit = parseFloat(metricOptions.crit);
							res.critIsNumber = true;
						} else if (metricOptions.crit instanceof Date) {
							res.crit = metricOptions.crit.valueOf();
							res.critIsNumber = true;
						} else {
							res.crit = metricOptions.crit;
							res.critIsNumber = false;
						}

						return res;
					}
				}, {
					key: "isFloat",
					value: function isFloat(val) {
						if (!isNaN(val) && val.toString().toLowerCase().indexOf('e') == -1) {
							return true;
						}
						return false;
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
				}]);

				return StatusPluginCtrl;
			}(MetricsPanelCtrl));

			_export("StatusPluginCtrl", StatusPluginCtrl);

			StatusPluginCtrl.templateUrl = 'module.html';
		}
	};
});
//# sourceMappingURL=status_ctrl.js.map

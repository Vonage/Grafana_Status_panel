"use strict";

System.register(["app/plugins/panel/graph/legend", "app/plugins/panel/graph/series_overrides_ctrl", "lodash", "app/core/time_series2", "app/plugins/sdk", "./css/status_panel.css!"], function (_export, _context) {
  "use strict";

  var _, TimeSeries, MetricsPanelCtrl, _createClass, StatusPluginCtrl;

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
    setters: [function (_appPluginsPanelGraphLegend) {}, function (_appPluginsPanelGraphSeries_overrides_ctrl) {}, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
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
        function StatusPluginCtrl($scope, $injector, $log, annotationsSrv) {
          _classCallCheck(this, StatusPluginCtrl);

          var _this = _possibleConstructorReturn(this, (StatusPluginCtrl.__proto__ || Object.getPrototypeOf(StatusPluginCtrl)).call(this, $scope, $injector));

          _this.log = $log.debug;

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

            this.log("refresh");

            this.measurements = _.filter(this.panel.targets, function (target) {
              return target.alias && !target.hide;
            });

            /** Duplicate alias validation **/
            this.duplicates = false;

            _.each(this.measurements, function (m) {
              var res = _.filter(_this2.measurements, function (measurement) {
                return m.alias == measurement.alias;
              });

              if (res.length > 1) {
                _this2.duplicates = true;
              }
            });
          }
        }, {
          key: "onInitEditMode",
          value: function onInitEditMode() {
            this.log(this);
            this.addEditorTab('Options', 'public/plugins/status-panel/editor.html', 2);

            this.log(this.panel.targets);
          }
        }, {
          key: "setUnitFormat",
          value: function setUnitFormat() {
            this.log("setUnitFormat");
          }
        }, {
          key: "onDataError",
          value: function onDataError() {
            this.log("onDataError");
          }
        }, {
          key: "changeSeriesColor",
          value: function changeSeriesColor(series, color) {
            this.log("changeSeriesColor");
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

            this.log("onRender");
            this.setElementHeight();

            var targets = this.panel.targets;

            this.crit = [];
            this.warn = [];

            _.each(this.series, function (s) {
              var target = _.find(targets, function (target) {
                return target.alias == s.alias;
              });

              if (target) {
                s.thresholds = StatusPluginCtrl.parseThresholds(target.thresholds);
                s.inverted = target.inverted;

                if (!s.inverted) {
                  if (s.datapoints[0][0] >= s.thresholds.crit) {
                    _this3.crit.push(s);
                  } else if (s.datapoints[0][0] >= s.thresholds.warn) {
                    _this3.warn.push(s);
                  }
                } else {
                  if (s.datapoints[0][0] <= s.thresholds.crit) {
                    _this3.crit.push(s);
                  } else if (s.datapoints[0][0] <= s.thresholds.warn) {
                    _this3.warn.push(s);
                  }
                }
              }
            });

            this.$panelContainer.removeClass('error-state warn-state ok-state');

            if (this.crit.length > 0) {
              //this.$panelContainer.css('background-color', "red");
              this.log("test");
              this.$panelContainer.addClass('error-state');
            } else if (this.warn.length > 0) {
              //this.$panelContainer.css('background-color', "orange");
              this.$panelContainer.addClass('warn-state');
            } else {
              //this.$panelContainer.css('background-color', "green");
              this.$panelContainer.addClass('ok-state');
            }
          }
        }, {
          key: "parseSeries",
          value: function parseSeries() {
            this.log("parseSeries");
          }
        }, {
          key: "onDataReceived",
          value: function onDataReceived(dataList) {
            this.log("onDataReceived");
            this.series = dataList.map(this.seriesHandler.bind(this));

            this.render();
          }
        }, {
          key: "seriesHandler",
          value: function seriesHandler(seriesData) {
            this.log("seriesHandler");
            this.log(seriesData);

            var series = new TimeSeries({
              datapoints: seriesData.datapoints,
              alias: seriesData.target
            });

            //series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

            return series;
          }
        }, {
          key: "getDecimalsForValue",
          value: function getDecimalsForValue(value) {
            this.log("getDecimalsForValue");
          }
        }, {
          key: "formatValue",
          value: function formatValue(value) {
            this.log("formatValue");
          }
        }, {
          key: "link",
          value: function link(scope, elem, attrs, ctrl) {
            this.log("link");
            this.$panelContainer = elem.find('.panel-container');
            this.$panelContoller = ctrl;
          }
        }], [{
          key: "parseThresholds",
          value: function parseThresholds(thresholds) {
            var res = {};

            var nums = _.split(thresholds, ",");

            res.warn = parseInt(_.trim(nums[0]));
            res.crit = parseInt(_.trim(nums[1]));

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

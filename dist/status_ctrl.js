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

          _this.aggregations = ['None', 'Max', 'Min', 'Sum'];

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

            _.each(this.series, function (s) {
              var target = _.find(targets, function (target) {
                return target.alias == s.alias;
              });

              if (!target) {
                return;
              }

              s.thresholds = StatusPluginCtrl.parseThresholds(target);
              s.inverted = s.thresholds.crit < s.thresholds.warn;
              s.display = target.display;
              s.url = target.url;

              var value = void 0;

              switch (target.aggregation) {
                case 'Max':
                  value = _.max(s.datapoints, function (point) {
                    return point[0];
                  })[0];
                  break;
                case 'Min':
                  value = _.min(s.datapoints, function (point) {
                    return point[0];
                  })[0];
                  break;
                case 'Sum':
                  value = 0;
                  _.each(s.datapoints, function (point) {
                    value += point[0];
                  });
                  break;
                default:
                  value = s.datapoints[0][0];
              }

              s.display_value = value;

              if (!s.inverted) {
                if (value >= s.thresholds.crit) {
                  _this3.crit.push(s);
                } else if (value >= s.thresholds.warn) {
                  _this3.warn.push(s);
                } else if (s.display) {
                  _this3.display.push(s);
                }
              } else {
                if (value <= s.thresholds.crit) {
                  _this3.crit.push(s);
                } else if (value <= s.thresholds.warn) {
                  _this3.warn.push(s);
                } else if (s.display) {
                  s.display_value = value;
                  _this3.display.push(s);
                }
              }
            });

            this.$panelContainer.removeClass('error-state warn-state ok-state');

            if (this.crit.length > 0) {
              //this.$panelContainer.css('background-color', "red");
              this.$panelContainer.addClass('error-state');
            } else if (this.warn.length > 0) {
              //this.$panelContainer.css('background-color', "orange");
              this.$panelContainer.addClass('warn-state');
            } else {
              //this.$panelContainer.css('background-color', "green");
              this.$panelContainer.addClass('ok-state');
            }

            this.parseUri();
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

            //series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

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
          value: function parseThresholds(measurement) {
            var res = {};

            res.warn = measurement.warn;
            res.crit = measurement.crit;

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

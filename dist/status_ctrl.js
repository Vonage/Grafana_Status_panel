'use strict';

System.register(['app/plugins/panel/graph/legend', 'app/plugins/panel/graph/series_overrides_ctrl', 'angular', 'moment', 'app/core/utils/kbn', 'lodash', 'app/core/time_series2', 'app/core/utils/file_export', 'app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var angular, moment, kbn, _, TimeSeries, fileExport, MetricsPanelCtrl, _createClass, StatusPluginCtrl;

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
    setters: [function (_appPluginsPanelGraphLegend) {}, function (_appPluginsPanelGraphSeries_overrides_ctrl) {}, function (_angular) {
      angular = _angular.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appCoreUtilsFile_export) {
      fileExport = _appCoreUtilsFile_export;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }],
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

      _export('StatusPluginCtrl', StatusPluginCtrl = function (_MetricsPanelCtrl) {
        _inherits(StatusPluginCtrl, _MetricsPanelCtrl);

        /** @ngInject */
        function StatusPluginCtrl($scope, $injector, $log, annotationsSrv) {
          _classCallCheck(this, StatusPluginCtrl);

          var _this = _possibleConstructorReturn(this, (StatusPluginCtrl.__proto__ || Object.getPrototypeOf(StatusPluginCtrl)).call(this, $scope, $injector));

          _this.log = $log.log;

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
          key: 'postRefresh',
          value: function postRefresh() {
            this.log("refresh");

            this.measurements = _.filter(this.panel.targets, function (target) {
              return target.alias && !target.hide;
            });

            /** Duplicate alias validation **/
            this.duplicates = false;

            function countDuplicates(m) {
              var res = _.filter(this.measurements, function (measurement) {
                return m.alias == measurement.alias;
              });

              if (res.length > 1) {
                this.duplicates = true;
              }
            }

            _.each(this.measurements, countDuplicates.bind(this));

            // TODO: Remove temp test code
            //if (this.status) {
            //  this.$panelContainer.css('background-color', "red");
            //} else {
            //  this.$panelContainer.css('background-color', "green");
            //}
            //
            //this.status = !this.status;
          }
        }, {
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.log(this);
            this.addEditorTab('Options', 'public/plugins/status-panel/editor.html', 2);

            this.log(this.panel.targets);
          }
        }, {
          key: 'setUnitFormat',
          value: function setUnitFormat() {
            this.log("setUnitFormat");
          }
        }, {
          key: 'onDataError',
          value: function onDataError() {
            this.log("onDataError");
          }
        }, {
          key: 'changeSeriesColor',
          value: function changeSeriesColor(series, color) {
            this.log("changeSeriesColor");
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            this.log("onRender");

            var targets = this.panel.targets;

            _.each(this.series, function (s) {
              var target = _.find(targets, function (target) {
                return target.alias == s.alias;
              });

              if (target) s.thresholds = target.thresholds;
            });
          }
        }, {
          key: 'parseSeries',
          value: function parseSeries() {
            this.log("parseSeries");
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.log("onDataReceived");
            this.series = dataList.map(this.seriesHandler.bind(this));

            this.render();
          }
        }, {
          key: 'seriesHandler',
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
          key: 'getDecimalsForValue',
          value: function getDecimalsForValue(value) {
            this.log("getDecimalsForValue");
          }
        }, {
          key: 'formatValue',
          value: function formatValue(value) {
            this.log("formatValue");
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            this.log("link");
            this.$panelContainer = elem.find('.panel-container');
          }
        }]);

        return StatusPluginCtrl;
      }(MetricsPanelCtrl));

      _export('StatusPluginCtrl', StatusPluginCtrl);

      StatusPluginCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=status_ctrl.js.map

import "app/plugins/panel/graph/legend";
import "app/plugins/panel/graph/series_overrides_ctrl";
import _ from "lodash";
import TimeSeries from "app/core/time_series2";
import {MetricsPanelCtrl} from "app/plugins/sdk";

export class StatusPluginCtrl extends MetricsPanelCtrl {
  /** @ngInject */
  constructor($scope, $injector, $log, annotationsSrv) {
    super($scope, $injector);

    this.log = $log.debug;

    /** Bind events to functions **/
    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.postRefresh.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
  }

  postRefresh() {
    this.log("refresh");

    this.measurements = _.filter(this.panel.targets, function(target) {
      return target.alias && !target.hide;
    });

    /** Duplicate alias validation **/
    this.duplicates = false;

    function countDuplicates(m) {
      var res = _.filter(this.measurements, function(measurement) {
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

  onInitEditMode() {
    this.log(this);
    this.addEditorTab('Options', 'public/plugins/status-panel/editor.html', 2);

    this.log(this.panel.targets);
  }

  setUnitFormat() {
    this.log("setUnitFormat");
  }

  onDataError() {
    this.log("onDataError");
  }

  changeSeriesColor(series, color) {
    this.log("changeSeriesColor");
  }

  onRender() {
    this.log("onRender");

    let targets = this.panel.targets;

    _.each(this.series, function (s) {
      let target = _.find(targets, function(target) {
        return target.alias == s.alias;
      });

      if (target)
        s.thresholds = target.thresholds;
    });
  }

  parseSeries() {
    this.log("parseSeries");
  }

  onDataReceived(dataList) {
    this.log("onDataReceived");
    this.series = dataList.map(this.seriesHandler.bind(this));

    this.render();
  }

  seriesHandler(seriesData) {
    this.log("seriesHandler");
    this.log(seriesData);

    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });

    //series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

    return series;
  }

  getDecimalsForValue(value) {
    this.log("getDecimalsForValue");
  }

  formatValue(value) {
    this.log("formatValue");
  }

  link(scope, elem, attrs, ctrl) {
    this.log("link");
    this.$panelContainer = elem.find('.panel-container');
  }
}

StatusPluginCtrl.templateUrl = 'module.html';

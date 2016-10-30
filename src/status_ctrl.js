import {MetricsPanelCtrl} from "app/plugins/sdk";
import "app/plugins/panel/graph/legend";
import "app/plugins/panel/graph/series_overrides_ctrl";
import _ from "lodash";
import TimeSeries from "app/core/time_series2";

import './css/status_panel.css!';

export class StatusPluginCtrl extends MetricsPanelCtrl {
  /** @ngInject */
  constructor($scope, $injector, $log, annotationsSrv) {
    super($scope, $injector);

    /** Bind events to functions **/
    this.events.on('render', this.onRender.bind(this));
    this.events.on('refresh', this.postRefresh.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
  }

  postRefresh() {
    this.measurements = _.filter(this.panel.targets, (target) => {
      return target.alias && !target.hide;
    });

    /** Duplicate alias validation **/
    this.duplicates = false;

    _.each(this.measurements, (m) => {
      var res = _.filter(this.measurements, (measurement) => {
        return m.alias == measurement.alias;
      });

      if (res.length > 1) {
        this.duplicates = true;
      }
    });
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/status-panel/editor.html', 2);
  }

  setElementHeight() {
    this.$panelContainer.find('.status-panel').css('height', this.$panelContoller.height + 'px');
  }

  onRender() {
    this.setElementHeight();

    let targets = this.panel.targets;

    this.crit = [];
    this.warn = [];

    _.each(this.series, (s) => {
      let target = _.find(targets, (target) => {
        return target.alias == s.alias;
      });

      if (target) {
        s.thresholds = StatusPluginCtrl.parseThresholds(target.thresholds);
        s.inverted = target.inverted;

        if (!s.inverted) {
          if (s.datapoints[0][0] >= s.thresholds.crit) {
            this.crit.push(s);
          } else if (s.datapoints[0][0] >= s.thresholds.warn) {
            this.warn.push(s);
          }
        } else {
          if (s.datapoints[0][0] <= s.thresholds.crit) {
            this.crit.push(s);
          } else if (s.datapoints[0][0] <= s.thresholds.warn) {
            this.warn.push(s);
          }
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
  }

  static parseThresholds(thresholds) {
    let res = {};
    let nums = thresholds.split(",");

    res.warn = parseInt(nums[0].trim());
    res.crit = parseInt(nums[1].trim());

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

    //series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

    return series;
  }

  link(scope, elem, attrs, ctrl) {
    this.$panelContainer = elem.find('.panel-container');
    this.$panelContoller = ctrl;
  }
}

StatusPluginCtrl.templateUrl = 'module.html';

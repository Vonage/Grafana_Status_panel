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

    this.aggregations = ['None', 'Max', 'Min', 'Sum'];

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

    _.each(this.series, (s) => {
      let target = _.find(targets, (target) => {
        return target.alias == s.alias;
      });

      if (!target) {
        return;
      }

      s.thresholds = StatusPluginCtrl.parseThresholds(target);
      s.inverted = s.thresholds.crit < s.thresholds.warn;
      s.display = target.display;
      s.url = target.url;

      let value;

      switch (target.aggregation) {
        case 'Max':
          value = _.max(s.datapoints, (point) => { return point[0]; })[0];
          break;
        case 'Min':
          value = _.min(s.datapoints, (point) => { return point[0]; })[0];
          break;
        case 'Sum':
          value = 0;
          _.each(s.datapoints, (point) => { value += point[0] });
          break;
        default:
          value = s.datapoints[0][0];
      }

      s.display_value = value;

      if (!s.inverted) {
        if (value >= s.thresholds.crit) {
          this.crit.push(s);
        } else if (value >= s.thresholds.warn) {
          this.warn.push(s);
        } else if (s.display) {
          this.display.push(s);
        }
      } else {
        if (value <= s.thresholds.crit) {
          this.crit.push(s);
        } else if (value <= s.thresholds.warn) {
          this.warn.push(s);
        } else if (s.display) {
          s.display_value = value;
          this.display.push(s);
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

  parseUri() {
    if (this.panel.links && this.panel.links.length > 0) {
      this.uri = this.panel.links[0].dashUri + "?" + this.panel.links[0].params;
    } else {
      this.uri = undefined;
    }
  }

  static parseThresholds(measurement) {
    let res = {};

    res.warn = measurement.warn;
    res.crit = measurement.crit;

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

import {
  PanelData,
  FieldConfigSource,
  FieldConfig,
  formattedValueToString,
  toFixedUnit,
  toFixed,
  dateTimeAsMoment,
  InterpolateFunction,
  LinkModel,
} from '@grafana/data';
import { css, cx } from 'emotion';
import _ from 'lodash';

import { StatusFieldOptions } from 'lib/statusFieldOptionsBuilder';
import { StatusPanelOptions } from 'lib/statusPanelOptionsBuilder';

type StatusType = 'ok' | 'hide' | 'warn' | 'crit' | 'disable' | 'noData';
interface StatusMetricProp extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  alias: string;
  displayValue?: string | number;
  link?: LinkModel;
}

export function buildStatusMetricProps(
  data: PanelData,
  fieldConfig: FieldConfigSource,
  options: StatusPanelOptions,
  colorClasses: { ok: string; warn: string; crit: string; disable: string; noData: string; hide: string },
  replaceVariables: InterpolateFunction,
  timeZone: string
) {
  let annotations: StatusMetricProp[] = [];
  let displays: StatusMetricProp[] = [];
  let crits: StatusMetricProp[] = [];
  let warns: StatusMetricProp[] = [];
  let disables: StatusMetricProp[] = [];
  data.series.forEach(df => {
    // find first non-time column
    const field = df.fields.find(field => field.name !== 'Time')!;
    if (!field?.state) {
      return;
    }

    const config: FieldConfig<StatusFieldOptions> = _.defaultsDeep({ ...field.config }, fieldConfig.defaults);
    if (!config.custom) {
      return;
    }

    // determine field status & handle formatting based on value handler
    let fieldStatus: StatusType = config.custom.displayAliasType === 'Always' ? 'ok' : 'hide';
    let displayValue = '';
    switch (config.custom.thresholds.valueHandler) {
      case 'Number Threshold':
        let value: number = field.state.calcs![config.custom.aggregation];
        const crit = +config.custom.thresholds.crit;
        const warn = +config.custom.thresholds.warn;
        if ((warn <= crit && crit <= value) || (warn >= crit && crit >= value)) {
          fieldStatus = 'crit';
        } else if ((warn <= value && value <= crit) || (warn >= value && value >= crit)) {
          fieldStatus = 'warn';
        }

        if (!_.isFinite(value)) {
          displayValue = 'Invalid Number';
        } else if (config.unit) {
          displayValue = formattedValueToString(toFixedUnit(config.unit)(value, config.decimals));
        } else {
          displayValue = toFixed(value, config.decimals);
        }
        break;
      case 'String Threshold':
        displayValue = field.state.calcs![config.custom.aggregation];
        if (displayValue === undefined || displayValue === null || displayValue !== displayValue) {
          displayValue = 'Invalid String';
        }

        if (displayValue === config.custom.thresholds.crit) {
          fieldStatus = 'crit';
        } else if (displayValue === config.custom.thresholds.warn) {
          fieldStatus = 'warn';
        }
        break;
      case 'Date Threshold':
        const val: string = field.state.calcs![config.custom.aggregation];
        let date = dateTimeAsMoment(val);
        if (timeZone === 'utc') {
          date = date.utc();
        }

        displayValue = date.format(config.custom.dateFormat);

        if (val === config.custom.thresholds.crit) {
          fieldStatus = 'crit';
        } else if (val === config.custom.thresholds.warn) {
          fieldStatus = 'warn';
        }
        break;
      case 'Disable Criteria':
        if (field.state.calcs![config.custom.aggregation] === config.custom.disabledValue) {
          fieldStatus = 'disable';
        }
        break;
    }

    // only display value when appropriate
    const withAlias = config.custom.displayValueWithAlias;
    const isDisplayValue =
      withAlias === 'When Alias Displayed' ||
      (fieldStatus === 'warn' && withAlias === 'Warning / Critical') ||
      (fieldStatus === 'crit' && (withAlias === 'Warning / Critical' || withAlias === 'Critical Only'));

    // apply RegEx if value will be displayed
    if (isDisplayValue && config.custom.valueDisplayRegex) {
      try {
        displayValue = displayValue.replace(new RegExp(config.custom.valueDisplayRegex), '');
      } catch {}
    }

    // get first link and interpolate variables
    const link = ((field.getLinks && field.getLinks({})) ?? [])[0];
    if (link) {
      link.href = replaceVariables(link.href);
    }

    // build props and place in correct bucket
    let props: StatusMetricProp = {
      alias: config.displayName || df.name || df.refId || '',
      displayValue: isDisplayValue ? displayValue : undefined,
      link,
    };

    // set font format for field
    if (fieldStatus !== 'ok') {
      if (config.custom.fontFormat === 'Bold') {
        props.className = css({ fontWeight: 'bold' });
      } else if (config.custom.fontFormat === 'Italic') {
        props.className = css({ fontStyle: 'italic' });
      }
    }
    // set color for field when colormode is Metric
    if (options.colorMode === 'Metric') {
      props.className = cx(props.className, colorClasses[fieldStatus]);
    }

    // add to appropriate section
    if (fieldStatus === 'ok') {
      if (config.custom.displayType === 'Regular') {
        displays.push(props);
      } else {
        annotations.push(props);
      }
    } else if (fieldStatus === 'warn') {
      warns.push(props);
    } else if (fieldStatus === 'crit') {
      crits.push(props);
    } else if (fieldStatus === 'disable') {
      disables.push(props);
    }
  });

  return { annotations, disables, crits, warns, displays };
}

import { FieldConfigEditorBuilder } from '@grafana/data';
import { StatusThresholdOptionsEditor, StatusThresholdOptions } from 'components/StatusThresholdOptionsEditor';

export interface StatusFieldOptions {
  aggregation:
    | 'sum'
    | 'max'
    | 'min'
    | 'logmin'
    | 'mean'
    | 'last'
    | 'first'
    | 'lastNotNull'
    | 'firstNotNull'
    | 'count'
    | 'nonNullCount'
    | 'allIsNull'
    | 'allIsZero'
    | 'range'
    | 'diff'
    | 'delta'
    | 'step'
    | 'previousDeltaUp';
  valueDisplayRegex: string;
  thresholds: StatusThresholdOptions;
  displayType: 'Regular' | 'Annotation';
  fontFormat: 'Regular' | 'Bold' | 'Italic';
  dateFormat: string;
  displayAliasType: 'Warning / Critical' | 'Always';
  displayValueWithAlias: 'Never' | 'When Alias Displayed' | 'Warning / Critical' | 'Critical Only';
  disabledValue: string;
}

export const statusFieldOptionsBuilder = (builder: FieldConfigEditorBuilder<StatusFieldOptions>) =>
  builder
    .addSelect({
      path: 'aggregation',
      name: 'Aggregation',
      description: 'What to do if the query returns multiple data points.',
      defaultValue: 'last',
      settings: {
        options: [
          { label: 'Last', value: 'last' },
          { label: 'First', value: 'first' },
          { label: 'Max', value: 'max' },
          { label: 'Min', value: 'min' },
          { label: 'Sum', value: 'sum' },
          { label: 'Avg', value: 'mean' },
          { label: 'Delta', value: 'delta' },
        ],
      },
      category: ['Display Options'],
    })
    .addTextInput({
      path: 'valueDisplayRegex',
      name: 'Value Regex',
      description:
        "A regex which will decide the part of the value to be displayed. In case the regex is empty or it doesn't match any part of the metrics value, all the metric value will be displayed.",
      defaultValue: '',
      settings: {},
      category: ['Display Options'],
    })
    .addSelect({
      path: 'fontFormat',
      name: 'Font Format',
      description: 'The metric text font format in disable, warning or critical state',
      defaultValue: 'Regular',
      settings: {
        options: [
          { label: 'Regular', value: 'Regular' },
          { label: 'Bold', value: 'Bold' },
          { label: 'Italic', value: 'Italic' },
        ],
      },
      category: ['Display Options'],
    })
    .addCustomEditor({
      path: 'thresholds',
      id: 'thresholds',
      name: 'Threshold Type',
      defaultValue: { valueHandler: 'Number Threshold', warn: 70, crit: 90 },
      description: 'The type of data to show to the panel.',
      editor: StatusThresholdOptionsEditor,
      override: StatusThresholdOptionsEditor,
      category: ['Threshold Options'],
      process: x => x,
      shouldApply: () => true,
    })
    .addSelect({
      path: 'displayType',
      name: 'Display Position',
      description: 'The location the value will be displayed',
      defaultValue: 'Regular',
      settings: {
        options: [
          {
            label: 'Regular',
            value: 'Regular',
            description: 'The alias + the value will be display in the center, under the panel title',
          },
          {
            label: 'Annotation',
            value: 'Annotation',
            description:
              'The alias + the value will be displayed on top left. If the value answers a threshold condition, it will displayed as regular state',
          },
        ],
      },
      category: ['Display Options'],
      showIf: ({ thresholds }) => thresholds.valueHandler !== 'Disable Criteria',
    })
    .addTextInput({
      path: 'dateFormat',
      name: 'Date Format',
      defaultValue: 'YYYY-MM-DD HH:mm:ss',
      description: 'Specify the Date/Time format (Use "lll" for local date/time format)',
      category: ['Display Options'],
      showIf: ({ thresholds }) => thresholds.valueHandler === 'Date Threshold',
    })
    .addSelect({
      path: 'displayAliasType',
      name: 'Display Alias',
      description: 'When to display the alias',
      defaultValue: 'Warning / Critical',
      settings: {
        options: [
          {
            label: 'Warning / Critical',
            value: 'Warning / Critical',
            description: 'The alias will be displayed in warning or critical state',
          },
          {
            label: 'Always',
            value: 'Always',
            description: 'The alias will always be displayed, regardless critical and warning state',
          },
        ],
      },
      category: ['Display Options'],
      showIf: ({ thresholds }) => thresholds.valueHandler.slice(-9) === 'Threshold',
    })
    .addSelect({
      path: 'displayValueWithAlias',
      name: 'Display Value',
      description: 'When to display the value along with the alias',
      defaultValue: 'When Alias Displayed',
      settings: {
        options: [
          { label: 'Never', value: 'Never', description: 'The value will never be displayed' },
          {
            label: 'When Alias Displayed',
            value: 'When Alias Displayed',
            description: 'The value will be displayed always when alias is displayed',
          },
          {
            label: 'Warning / Critical',
            value: 'Warning / Critical',
            description: 'The value will be displayed in warning or critical state',
          },
          {
            label: 'Critical Only',
            value: 'Critical Only',
            description: 'The value will be displayed in critical only',
          },
        ],
      },
      category: ['Display Options'],
      showIf: ({ thresholds }) => thresholds.valueHandler.slice(-9) === 'Threshold',
    })
    .addTextInput({
      path: 'disabledValue',
      name: 'Disable Criteria',
      description: 'The exact value which will make this panel to be displayed as disabled',
      category: ['Threshold Options'],
      showIf: ({ thresholds }) => thresholds.valueHandler === 'Disable Criteria',
    });

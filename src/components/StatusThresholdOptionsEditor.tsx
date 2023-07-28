import { FieldOverrideEditorProps, SelectableValue } from '@grafana/data';
import { Input, Label, Select } from '@grafana/ui';
import React from 'react';

export interface StatusThresholdOptions {
  valueHandler: 'Number Threshold' | 'String Threshold' | 'Date Threshold' | 'Disable Criteria' | 'Text Only';
  warn: string;
  crit: string;
}

const valueHandlerOptions: Array<SelectableValue<StatusThresholdOptions['valueHandler']>> = [
  {
    label: 'Number Threshold',
    value: 'Number Threshold',
    description:
      'Change background color of the panel if got warning / error + show the alias of the problematic metrics.',
  },
  {
    label: 'String Threshold',
    value: 'String Threshold',
    description:
      'Change background color of the panel if got warning / error + show the alias of the problematic metrics.',
  },
  {
    label: 'Date Threshold',
    value: 'Date Threshold',
    description:
      'Change background color of the panel if got warning / error + show the alias of the problematic metrics.',
  },
  {
    label: 'Disable Criteria',
    value: 'Disable Criteria',
    description: 'Change background color of the panel to grey if disabled.',
  },
  {
    label: 'Text Only',
    value: 'Text Only',
    description: 'Show the alias + the value on the panel without any condition.',
  },
];

export const StatusThresholdOptionsEditor: React.FC<FieldOverrideEditorProps<StatusThresholdOptions, any>> = ({
  value,
  onChange,
}) => {
  if (!value) {
    value = { valueHandler: 'Number Threshold', crit: '90', warn: '70' };
  }

  let inputType;
  if (value.valueHandler === 'Number Threshold') {
    inputType = 'number';
  } else if (value.valueHandler === 'String Threshold') {
    inputType = 'text';
  } else if (value.valueHandler === 'Date Threshold') {
    inputType = 'datetime-local';
  }

  return (
    <>
      <Select
        value={value.valueHandler}
        options={valueHandlerOptions}
        onChange={({ value: valueHandler }) => valueHandler && onChange({ ...value, valueHandler })}
      ></Select>
      {inputType && (
        <>
          <Label>Critical Value</Label>
          <Input
            value={value.crit}
            type={inputType}
            onChange={({ currentTarget: { value: crit } }) => onChange({ ...value, crit })}
          ></Input>
          <Label>Warning Value</Label>
          <Input
            value={value.warn}
            type={inputType}
            onChange={({ currentTarget: { value: warn } }) => onChange({ ...value, warn })}
          ></Input>
        </>
      )}
    </>
  );
};

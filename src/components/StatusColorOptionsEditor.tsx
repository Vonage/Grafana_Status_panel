import React, { FC } from 'react';
import { ColorPicker } from '@grafana/ui';
import { PanelOptionsEditorProps } from '@grafana/data';
import { StatusPanelOptions } from 'lib/statusPanelOptionsBuilder';  // Update the import path if necessary

const defaultColors = {
  crit: "defaultCriticalColor",
  warn: "defaultWarningColor",
  ok: "defaultOkColor",
  disable: "defaultDisableColor"
};

export const StatusColorOptionsEditor: FC<PanelOptionsEditorProps<StatusPanelOptions['colors']>> = ({ value = defaultColors, onChange }) => {
  const colorPicker = (colorProps: { value: string; onChange: (color: string) => void }) => (
    <div className="gf-form">
      <ColorPicker color={colorProps.value} onChange={colorProps.onChange} /> 
    </div>
  );

  const buildHandler = (prop: keyof typeof defaultColors) => (color: string) => {
    onChange({
      ...value,
      [prop]: color,
    });
  };

  return (
    <div className="gf-form-inline">
      {colorPicker({ value: value.crit || defaultColors.crit, onChange: buildHandler('crit') })}
      {colorPicker({ value: value.warn || defaultColors.warn, onChange: buildHandler('warn') })}
      {colorPicker({ value: value.ok || defaultColors.ok, onChange: buildHandler('ok') })}
      {colorPicker({ value: value.disable || defaultColors.disable, onChange: buildHandler('disable') })}
    </div>
  );
};
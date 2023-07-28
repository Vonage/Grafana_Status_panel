import { ColorDefinition, PanelOptionsEditorProps, getColorForTheme, standardEditorsRegistry } from '@grafana/data';
import { HorizontalGroup, Label, getTheme } from '@grafana/ui';
import { StatusPanelOptions } from 'lib/statusPanelOptionsBuilder';
import React from 'react';

export const StatusColorOptionsEditor: React.FC<PanelOptionsEditorProps<StatusPanelOptions['colors']>> = ({
  value,
  onChange,
}) => {
  // get grafana color picker and theme
  const colorPicker = standardEditorsRegistry.get('color').editor as any;
  const theme = getTheme();

  // helper function to build the handler for each color
  const buildHandler = (key: keyof StatusPanelOptions['colors']) => (color: ColorDefinition) =>
    onChange({ ...value, [key]: getColorForTheme(color, theme as any) });

  return (
    <HorizontalGroup spacing="lg">
      <div>
        <Label>Critical</Label>
        {colorPicker({ value: value.crit, onChange: buildHandler('crit') })}
      </div>
      <div>
        <Label>Warning</Label>
        {colorPicker({ value: value.warn, onChange: buildHandler('warn') })}
      </div>
      <div>
        <Label>OK</Label>
        {colorPicker({ value: value.ok, onChange: buildHandler('ok') })}
      </div>
      <div>
        <Label>Disabled</Label>
        {colorPicker({ value: value.disable, onChange: buildHandler('disable') })}
      </div>
    </HorizontalGroup>
  );
};

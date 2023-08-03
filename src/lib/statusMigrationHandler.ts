import { DataLink, PanelMigrationHandler, PanelModel } from '@grafana/data';
import { StatusPanelOptions } from './statusPanelOptionsBuilder';

interface AngularPanelModel extends PanelModel {
  clusterName: string;
  namePrefix: string;
  maxAlertNumber: number;
  cornerRadius: number;
  flipCard: boolean;
  flipTime: number;
  colorMode: 'Panel' | 'Metric' | 'Disabled';
  colors: { crit: string; warn: string; ok: string; disable: string };
  isAutoScrollOnOverflow: boolean;
  isGrayOnNoData: boolean;
  isIgnoreOKColors: boolean;
  isHideAlertsOnDisable: boolean;
  links: DataLink[];
}

const isAngularModel = (panel: PanelModel): panel is AngularPanelModel => !!panel.options && 'clusterName' in panel;

export const statusMigrationHandler: PanelMigrationHandler<StatusPanelOptions> = panel => {
  if (isAngularModel(panel)) {
    const clusterLink = panel.links[0];
    const options: StatusPanelOptions = {
      clusterName: panel.clusterName,
      clusterUrl: clusterLink?.url,
      clusterTargetBlank: !!clusterLink?.targetBlank,
      namePrefix: panel.namePrefix,
      maxAlertNumber: panel.maxAlertNumber,
      cornerRadius: `${panel.cornerRadius}%`,
      flipCard: panel.flipCard,
      flipTime: panel.flipTime,
      colorMode: panel.colorMode,
      colors: panel.colors,
      isAutoScrollOnOverflow: panel.isAutoScrollOnOverflow,
      isGrayOnNoData: panel.isGrayOnNoData,
      isIgnoreOKColors: panel.isIgnoreOKColors,
      isHideAlertsOnDisable: panel.isHideAlertsOnDisable,
    };
    return options;
  } else {
    return {};
  }
};

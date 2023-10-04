import { PanelPlugin } from '@grafana/data';
import { StatusPanel } from './components/StatusPanel';
import { statusMigrationHandler } from 'lib/statusMigrationHandler';
import { statusPanelOptionsBuilder } from 'lib/statusPanelOptionsBuilder';
import { statusFieldOptionsBuilder } from 'lib/statusFieldOptionsBuilder';
export var plugin = new PanelPlugin(StatusPanel)
    .setMigrationHandler(statusMigrationHandler)
    .setPanelOptions(statusPanelOptionsBuilder)
    .useFieldConfig({ useCustomConfig: statusFieldOptionsBuilder });
//# sourceMappingURL=module.js.map
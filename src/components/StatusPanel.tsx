import { PanelProps } from '@grafana/data';
import { IconButton } from '@grafana/ui';
import { css } from 'emotion';
import _ from 'lodash';
import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { ReactMarquee } from 'components/Marquee';
import { useHover, useInterval } from 'hooks/index';
import { StatusPanelOptions } from 'lib/statusPanelOptionsBuilder';
import { buildStatusMetricProps } from 'lib/buildStatusMetricProps';
import { MaybeAnchor } from './MaybeAnchor';

type StatusType = 'ok' | 'hide' | 'warn' | 'crit' | 'disable' | 'noData';
type Props = PanelProps<StatusPanelOptions>;
export const StatusPanel: React.FC<Props> = ({
  data,
  options,
  fieldConfig,
  width,
  height,
  replaceVariables,
  timeZone,
}) => {
  // build styles
  const statusColorClasses = {
    ok: options.isIgnoreOKColors ? '' : css({ color: options.colors.ok }),
    warn: css({ color: options.colors.warn }),
    crit: css({ color: options.colors.crit }),
    disable: css({ color: options.colors.disable }),
    noData: css({ color: options.colors.disable }),
    hide: css({ display: 'none' }),
  };

  // build props
  let { annotations, disables, crits, warns, displays } = buildStatusMetricProps(
    data,
    fieldConfig,
    options,
    statusColorClasses,
    replaceVariables,
    timeZone
  );

  // clear other metrics when disabled and hide on disable
  if (options.isHideAlertsOnDisable && disables.length > 0) {
    crits = warns = displays = [];
  }

  // flatten and slice sections as needed
  let alerts = [disables, crits, warns, displays].flat(1);
  let extraMoreAlerts = null;
  if (0 <= options.maxAlertNumber && options.maxAlertNumber < alerts.length) {
    extraMoreAlerts = alerts.length - options.maxAlertNumber;
    alerts = alerts.slice(0, options.maxAlertNumber);
  }

  // setup flipper
  const [flipped, setFlipped] = React.useState(true);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const isHover = useHover(wrapper);
  useInterval(() => options.flipCard && !isHover && setFlipped(!flipped), 1000 * options.flipTime);

  // set panel status and render
  const panelStatus: StatusType = disables.length
    ? 'disable'
    : crits.length
    ? 'crit'
    : warns.length
    ? 'warn'
    : !data.series.length && options.isGrayOnNoData
    ? 'noData'
    : 'ok';

  return (
    <div
      ref={wrapper}
      className={css(
        {
          width,
          height,
          boxSizing: 'border-box',
          borderRadius: options.cornerRadius,
          overflow: 'hidden',
          zIndex: 10,
        },
        !(panelStatus === 'ok' && options.isIgnoreOKColors) &&
          options.colorMode === 'Panel' && { backgroundColor: (options.colors as any)[panelStatus] }
      )}
    >
      <ReactCardFlip isFlipped={flipped}>
        <div
          className={css(
            {
              width,
              height,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
            },
            options.colorMode === 'Metric' && statusColorClasses[panelStatus]
          )}
        >
          <MaybeAnchor
            href={options.clusterUrl}
            target={options.clusterTargetBlank ? '_blank' : '_self'}
            title={options.clusterName}
          >
            {panelStatus === 'crit'
              ? 'Critical'
              : panelStatus === 'disable'
              ? 'Disabled'
              : panelStatus === 'noData'
              ? 'No Data'
              : panelStatus === 'ok'
              ? 'OK'
              : 'Warn'}
          </MaybeAnchor>
        </div>
        <div className={css({ height, display: 'flex', flexDirection: 'column' })}>
          <div
            className={css({
              flex: '1 0 0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            })}
          >
            <div className={css({ minHeight: '1px', display: 'flex', justifyContent: 'center', fontSize: '1.5rem' })}>
              <MaybeAnchor
                href={options.clusterUrl}
                target={options.clusterTargetBlank ? '_blank' : '_self'}
                title={options.clusterName}
              >
                {replaceVariables(options.clusterName)}
              </MaybeAnchor>
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'scroll',
              flex: '0 1 auto',
              '::-webkit-scrollbar': { background: 'transparent', width: '0px', display: 'none' },
            })}
          >
            <ReactMarquee hover={isHover} autoScroll={options.isAutoScrollOnOverflow}>
              <div>
                {alerts.map(({ alias, link, className, displayValue }) => (
                  <div className={className} style={{ color: 'inherit' }}>
                    <MaybeAnchor href={link?.href} target={link?.target} title={alias} style={{ color: 'inherit' }}>
                      {displayValue ? alias + ' - ' + displayValue : alias}
                    </MaybeAnchor>
                  </div>
                ))}
                {extraMoreAlerts && (
                  <span className={css({ paddingTop: '2px', fontSize: '0.85rem' })}>+ {extraMoreAlerts} more</span>
                )}
              </div>
            </ReactMarquee>
          </div>
          <div className={css({ fontSize: '1.5rem', minHeight: '1px', flex: '1 1 0' })}></div>
          <div
            className={css({
              position: 'absolute',
              height,
              overflow: 'scroll',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              '::-webkit-scrollbar': { background: 'transparent', width: '0px', display: 'none' },
            })}
          >
            <ReactMarquee hover={isHover} autoScroll={options.isAutoScrollOnOverflow}>
              <div className={css({ fontSize: '0.85rem' })}>
                {annotations.map(({ alias, link, className, displayValue }) => (
                  <div className={className} style={{ color: 'inherit' }}>
                    <MaybeAnchor href={link?.href} target={link?.target} title={alias} style={{ color: 'inherit' }}>
                      {displayValue ? alias + ' - ' + displayValue : alias}
                    </MaybeAnchor>
                  </div>
                ))}
              </div>
            </ReactMarquee>
          </div>
        </div>
      </ReactCardFlip>
      {isHover && (
        <IconButton
          name={'exchange-alt'}
          onClick={() => setFlipped(!flipped)}
          className={css({ position: 'absolute', bottom: '2rem', right: '2rem' })}
        ></IconButton>
      )}
    </div>
  );
};

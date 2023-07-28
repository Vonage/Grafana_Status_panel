import React from 'react';
import { useInterval } from 'hooks';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
  hover?: boolean;
}

export const ReactMarquee: React.FC<Props> = ({ autoScroll, hover, ...props }) => {
  const div = React.useRef<HTMLDivElement>(null);

  const fps = 30;
  const [y, setY] = React.useState(0);
  const [dy, setDy] = React.useState(1);

  useInterval(() => {
    if (div.current) {
      if (hover) {
        setY(div.current.parentElement!.scrollTop | 0);
      } else if (autoScroll) {
        if (0 <= y && y <= div.current.parentElement!.scrollHeight - div.current.parentElement!.offsetHeight + 1) {
          div.current.parentElement!.scrollTo(0, y);
          setY(y + dy);
        } else {
          setY(y - dy);
          setDy(-dy);
        }
      }
    }
  }, 1000 / fps);

  return <div ref={div} {...props}></div>;
};

import React from 'react';

export const MaybeAnchor: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = props =>
  props.href ? <a {...props}></a> : <>{props.children}</>;

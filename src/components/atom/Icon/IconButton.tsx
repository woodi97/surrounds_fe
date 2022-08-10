import React, { ButtonHTMLAttributes, FC } from 'react';

import Icon, { SVGTypes } from './Icon';

export type IconButtonProps = {
  name: SVGTypes;
  size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<IconButtonProps> = ({ name, type = 'button', size, ...props }) => {
  return (
    <button name={name} type={type} {...props}>
      <Icon name={name} size={size} />
    </button>
  );
};

export default IconButton;

import React, { FC } from 'react';

import Icon, { SVGTypes } from './Icon';

export type IconButtonProps = {
  classNames?: string;
  name: SVGTypes;
  type?: 'button' | 'submit' | 'reset';
  size?: number;
  onClick: (e?) => void;
};

const IconButton: FC<IconButtonProps> = ({ classNames, name, type = 'button', size, onClick }) => {
  return (
    <button className={classNames} name={name} type={type} onClick={onClick}>
      <Icon name={name} size={size} />
    </button>
  );
};

export default IconButton;

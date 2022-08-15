import { Icon, InputBox } from '@src/components/atom';
import { SVGTypes } from '@src/components/atom/Icon/Icon';
import { InputBoxProps } from '@src/components/atom/InputBox';
import React, { FunctionComponent } from 'react';

const InputBoxWithIcon: FunctionComponent<
  {
    iconName: SVGTypes;
  } & Partial<InputBoxProps>
> = ({ iconName, name, value, ...props }) => {
  return (
    <div className="w-full flex items-center px-2 rounded-xl bg-gray-200">
      <Icon name={iconName} className="w-8" />
      <InputBox
        classNames="bg-transparent w-full"
        fullWidth
        removeLabelText
        size="small"
        type="id"
        name={name}
        label={name}
        value={value}
        {...props}
      />
    </div>
  );
};

export default InputBoxWithIcon;

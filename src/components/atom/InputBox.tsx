import { inputBoxSizes } from '@src/utils/constants';
import cx from 'classnames';
import React, { ChangeEventHandler, FunctionComponent, HTMLAttributes, memo } from 'react';

const sizeSelector: { [keys in inputBoxSizes] } = {
  small: 'h-12',
  medium: 'h-14',
  large: 'h-16',
};

export type InputBoxProps = {
  type: 'id' | 'email' | 'password';
  name: string;
  label: string;
  value: string | number;
  size?: inputBoxSizes;
  placeholder?: string;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  removeLabelText?: boolean;
  classNames?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & HTMLAttributes<HTMLInputElement>;

const InputBox: FunctionComponent<InputBoxProps> = ({
  name,
  label,
  size = 'medium',
  error,
  errorMessage = 'wrong input',
  fullWidth = false,
  removeLabelText = false,
  classNames,
  ...props
}) => {
  return (
    <div className={fullWidth ? 'w-full' : 'w-[280px] md:w-[320px]'}>
      <div className="w-full">
        <label htmlFor={name} className={removeLabelText ? 'invisible' : 'mb-2'}>
          {!removeLabelText && <p className="font-bold">{label}</p>}
        </label>
        <input
          id={name}
          name={name}
          className={cx(
            'p-2 w-full bg-transparent',
            'border-2 rounded-md',
            'focus:outline-none',
            sizeSelector[size],
            error ? 'border-red-400' : 'border-none',
            classNames
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs md:text-sm text-red-400">{errorMessage}</p>}
    </div>
  );
};

export default memo(InputBox);

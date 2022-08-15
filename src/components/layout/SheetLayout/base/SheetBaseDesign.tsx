import SheetBaseHeader from '@src/components/layout/SheetLayout/base/SheetBaseHeader';
import cx from 'classnames';
import React, { FC } from 'react';

const SheetBaseDesign: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={cx(
        'w-full h-full overflow-y-scroll overflow-x-hidden',
        'rounded-t-xl border-x-2 border-t-2 border-gray-300 bg-white',
        'px-side-padding'
      )}
    >
      <SheetBaseHeader />
      {children}
    </div>
  );
};

export default SheetBaseDesign;

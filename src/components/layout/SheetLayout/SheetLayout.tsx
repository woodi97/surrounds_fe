import SheetBaseOverlay from '@src/components/layout/SheetLayout/base/SheetBaseOverlay';
import React, { FC } from 'react';

import SheetBaseDesign from './base/SheetBaseDesign';
import SheetBaseLayout from './base/SheetBaseLayout';

export type SheetBaseShape = {
  isActiveOverLay?: boolean;
  sheetPosition?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

const SheetLayout: FC<SheetBaseShape> = ({
  isActiveOverLay = false,
  sheetPosition = 'top-0',
  children,
  onClose,
}) => {
  return (
    <SheetBaseLayout isActiveOverLay={isActiveOverLay} sheetPosition={sheetPosition}>
      <SheetBaseOverlay isActiveOverLay={isActiveOverLay} onClose={onClose} />
      <SheetBaseDesign>{children}</SheetBaseDesign>
    </SheetBaseLayout>
  );
};

export default SheetLayout;

import React, { FC, ReactNode } from 'react';

import ModalBaseDesign from './base/ModalBaseDesign';
import ModalBaseLayout from './base/ModalBaseLayout';
import ModalBaseOverLay from './base/ModalBaseOverLay';

export type ModalBaseShape = {
  fullScreen: boolean;
  children?: ReactNode;
  onClose: () => void;
};

const ModalLayout: FC<ModalBaseShape> = ({ fullScreen, children, onClose }) => {
  return (
    <ModalBaseLayout>
      <ModalBaseOverLay onClick={onClose} />
      <ModalBaseDesign onClose={onClose} fullScreen={fullScreen}>
        {children}
      </ModalBaseDesign>
    </ModalBaseLayout>
  );
};

export default ModalLayout;

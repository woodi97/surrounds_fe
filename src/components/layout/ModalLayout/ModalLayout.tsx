import React, { FC, ReactNode } from 'react';

import ModalBaseDesign from './base/ModalBaseDesign';
import ModalBaseLayout from './base/ModalBaseLayout';
import ModalBaseOverLay from './base/ModalBaseOverLay';

export type ModalBaseShape = {
  children?: ReactNode;
  onClose: () => void;
};

const ModalLayout: FC<ModalBaseShape> = ({ children, onClose }) => {
  return (
    <ModalBaseLayout>
      <ModalBaseOverLay onClick={onClose} />
      <ModalBaseDesign>{children}</ModalBaseDesign>
    </ModalBaseLayout>
  );
};

export default ModalLayout;

import Portal from '@src/components/atom/Portal';
import {
  RoomCreateModalContent,
  SignInModalContent,
} from '@src/components/containers/modal/content';
import { ModalLayout } from '@src/components/layout';
import { ModalType } from '@src/core/types/modal-type';
import { useRootDispatch, useRootState } from '@src/hooks/useRootState';
import { closeModal } from '@src/store/modules/modal';
import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';

const _selectModal: { [key in ModalType]: FC<unknown> } = {
  SIGNIN: SignInModalContent,
  ROOMCREATE: RoomCreateModalContent,
};

const ModalContainer: FC = () => {
  const modal = useRootState((state) => state.modal);
  const dispatch = useRootDispatch();

  const ModalComponent = modal.type ? _selectModal[modal.type] : null;

  return (
    <Portal selectorId="modal">
      <AnimatePresence exitBeforeEnter>
        {modal.type && (
          <ModalLayout
            key={`modal-base-${Math.floor(Math.random() * 1000)}`}
            onClose={() => {
              dispatch(closeModal());
            }}
          >
            {ModalComponent && <ModalComponent />}
          </ModalLayout>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ModalContainer;

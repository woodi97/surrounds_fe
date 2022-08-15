import Portal from '@src/components/atom/Portal';
import {
  RoomCreateModalContent,
  RoomJoinModalContent,
  SignInModalContent,
} from '@src/components/containers/modal/content';
import { ModalLayout } from '@src/components/layout';
import { ModalContentType, ModalType } from '@src/core/types/modal-type';
import { useRootDispatch, useRootState } from '@src/hooks/useRootState';
import { closeModal } from '@src/store/modules/modal';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const _selectModal: { [key in ModalType]: FC<ModalContentType> } = {
  SIGNIN: SignInModalContent,
  ROOMCREATE: RoomCreateModalContent,
  ROOMJOIN: RoomJoinModalContent,
};

const ModalContainer: FC = () => {
  const router = useRouter();
  const modal = useRootState((state) => state.modal);
  const dispatch = useRootDispatch();

  const ModalComponent = modal.type ? _selectModal[modal.type] : null;

  return (
    <Portal selectorId="modal">
      <AnimatePresence exitBeforeEnter>
        {modal.type && (
          <ModalLayout
            fullScreen={modal.fullScreen}
            key={`modal-base-${Math.floor(Math.random() * 1000)}`}
            onClose={() => {
              dispatch(closeModal());
              router.push(router.pathname, undefined, { shallow: true });
            }}
          >
            {ModalComponent && <ModalComponent option={modal.option} />}
          </ModalLayout>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ModalContainer;

import { RoomCreateForm } from '@src/components/molecule';
import { apiCreateChatroom } from '@src/core/api/chatroom';
import { envConfig } from '@src/core/config/envConfig';
import { ModalContentType } from '@src/core/types/modal-type';
import { useRootDispatch, useRootState } from '@src/hooks';
import { closeModal } from '@src/store/modules/modal';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

const RoomCreateModalContent: FunctionComponent<ModalContentType> = ({ option }) => {
  const dispatch = useRootDispatch();
  const router = useRouter();
  const { location } = useRootState((state) => state.device);

  const handleSubmit = async (title, description) => {
    try {
      const result = await apiCreateChatroom({
        title,
        description,
        location,
      });
      router.push(
        {
          pathname: '/',
          query: { roomId: result.id },
        },
        undefined,
        { shallow: true }
      );
    } catch (e) {
    } finally {
      dispatch(closeModal());
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1>Create {envConfig.appName}</h1>
      <RoomCreateForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RoomCreateModalContent;

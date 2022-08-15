import { SignInForm } from '@src/components/molecule';
import { envConfig } from '@src/core/config/envConfig';
import { ModalContentType } from '@src/core/types/modal-type';
import { useRootDispatch } from '@src/hooks';
import { closeModal } from '@src/store/modules/modal';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

const SignInModalContent: FunctionComponent<ModalContentType> = ({ option }) => {
  const router = useRouter();
  const dispatch = useRootDispatch();

  return (
    <div className="w-full flex flex-col items-center">
      <h1>{envConfig.appName}</h1>
      <SignInForm
        router={router}
        dispatch={dispatch}
        onSuccess={async () => {
          await dispatch(closeModal());
        }}
      />
    </div>
  );
};

export default SignInModalContent;

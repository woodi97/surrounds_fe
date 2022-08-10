import { SignInForm } from '@src/components/molecule';
import { useRootDispatch } from '@src/hooks';
import { closeModal } from '@src/store/modules/modal';
import { useRouter } from 'next/router';
import React from 'react';

const SignInModal = () => {
  const router = useRouter();
  const dispatch = useRootDispatch();

  return (
    <SignInForm
      router={router}
      dispatch={dispatch}
      onSuccess={async () => {
        await dispatch(closeModal());
      }}
    />
  );
};

export default SignInModal;

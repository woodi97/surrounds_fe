import { SignUpForm } from '@src/components/molecule';
import { apiSignUp } from '@src/core/api/auth';
import { useRootDispatch } from '@src/hooks';
import { openSignInModal } from '@src/store/modules/modal';
import React from 'react';

const SignUpModal = () => {
  const dispatch = useRootDispatch();

  const handleSubmit = async ({ username, email, password }) => {
    try {
      await apiSignUp(username, email, password);
      await dispatch(openSignInModal());
    } catch (err) {}
  };

  return <SignUpForm onSubmit={handleSubmit} />;
};

export default SignUpModal;

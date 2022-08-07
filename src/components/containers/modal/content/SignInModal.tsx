import { SignInForm } from '@src/components/molecule';
import { apiSignIn } from '@src/core/api/auth';
import { useRootDispatch } from '@src/hooks';
import { setUserInfo } from '@src/store/modules/auth';
import { closeModal } from '@src/store/modules/modal';
import { useRouter } from 'next/router';
import React from 'react';

const SignInModal = () => {
  const router = useRouter();
  const dispatch = useRootDispatch();
  const handleSubmit = async ({ email, password }) => {
    try {
      const result = await apiSignIn(email, password);
      await dispatch(
        setUserInfo({
          email: result.email,
          username: result.username,
          profile_image: result.profile_image,
        })
      );
      await dispatch(closeModal());
      // Todo: set Interval before route to home page
      await router.push('/');
    } catch (err) {}
  };

  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignInModal;

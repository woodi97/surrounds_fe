// Todo clear jwt token on client
import { apiValidate } from '@src/core/api/auth';
import { withStoreSSR } from '@src/hocnf/index';
import { clearUserInfo, setUserInfo } from '@src/store/modules/auth';
import { setServerAuthToken } from '@src/utils/authUtil';
import { GetServerSideProps } from 'next';

const withAuthSSR = (getServerSidePropsFunc?: GetServerSideProps): GetServerSideProps => {
  return withStoreSSR((store) => {
    return async (ctx) => {
      const authState = store.getState().auth;
      if (authState.isLogin) {
        return await getServerSidePropsFunc?.(ctx);
      } else {
        const token = ctx.req.cookies.jwt;
        if (!token) {
          return {
            props: {},
            redirect: {
              destination: '/signin',
              permanent: false,
            },
          };
        }
        setServerAuthToken(token);
        try {
          const result = await apiValidate();
          store.dispatch(
            setUserInfo({
              email: result.email,
              username: result.username,
              profile_image: result.profile_image,
            })
          );
          return await getServerSidePropsFunc?.(ctx);
        } catch (error) {
          // should clear jwt token on client
          store.dispatch(clearUserInfo());
          return {
            props: {},
            redirect: {
              destination: '/signin',
              permanent: false,
            },
          };
        }
      }
    };
  });
};

export default withAuthSSR;

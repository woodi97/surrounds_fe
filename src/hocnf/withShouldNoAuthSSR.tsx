// Todo clear jwt token on client
import { apiValidate } from '@src/core/api/auth';
import { withStoreSSR } from '@src/hocnf/index';
import { clearUserInfo, setUserInfo } from '@src/store/modules/auth';

const withShouldNoAuthSSR = () => {
  return withStoreSSR((store) => {
    return async (ctx) => {
      const auth = store.getState().auth;
      if (auth.isLogin) {
        return {
          props: {},
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      } else {
        const token = ctx.req.cookies.jwt;
        if (!token) {
          return {
            props: {},
          };
        }
        try {
          const result = await apiValidate();
          store.dispatch(
            setUserInfo({
              email: result.email,
              username: result.username,
              profile_image: result.profile_image,
            })
          );
          return {
            props: {},
            redirect: {
              destination: '/',
              permanent: false,
            },
          };
        } catch (error) {
          store.dispatch(clearUserInfo());
          return {
            props: {},
          };
        }
      }
    };
  });
};

export default withShouldNoAuthSSR;

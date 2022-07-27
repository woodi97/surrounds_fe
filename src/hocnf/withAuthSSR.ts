// Todo clear jwt token on client
import { apiValidate } from '@src/core/api/auth'
import { clearUserInfo, setUserInfo } from '@src/store/modules/auth'
import { setAuthToken } from '@src/utils/authUtil'
import { GetServerSideProps } from 'next'
import { withStoreSSR } from '@src/hocnf/index'

const withAuthSSR = (getServerSidePropsFunc?: GetServerSideProps): GetServerSideProps => {
  return withStoreSSR((store) => {
    return async (ctx) => {
      const authState = store.getState().auth
      if (authState.isLogin) {
        return await getServerSidePropsFunc?.(ctx)
      } else {
        const token = ctx.req.cookies.jwt
        if (!token) {
          return {
            props: {},
            redirect: {
              url: '/login',
            },
          }
        }
        setAuthToken(token)
        try {
          const result = await apiValidate()
          store.dispatch(
            setUserInfo({
              email: result.email,
              nickname: result.nickname,
              profileImage: result.profileImage,
            })
          )
          return await getServerSidePropsFunc?.(ctx)
        } catch (error) {
          // should clear jwt token on client
          store.dispatch(clearUserInfo())
          return {
            props: {},
            redirect: {
              destination: '/login',
            },
          }
        }
      }
    }
  })
}

export default withAuthSSR

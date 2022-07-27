// Todo clear jwt token on client
import { apiValidate } from '@src/core/api/auth'
import { withStoreSSR } from '@src/hocnf/index'
import { clearUserInfo, setUserInfo } from '@src/store/modules/auth'
import { setAuthToken } from '@src/utils/authUtil'

const withShouldNoAuthSSR = () => {
  return withStoreSSR((store) => {
    return async (ctx) => {
      const auth = store.getState().auth
      if (auth.isLogin) {
        return {
          props: {},
          redirect: {
            destination: '/',
          },
        }
      } else {
        const token = ctx.req.cookies.jwt
        if (!token) {
          return {
            props: {},
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
          return {
            props: {},
            redirect: {
              destination: '/',
            },
          }
        } catch (error) {
          store.dispatch(clearUserInfo())
          return {
            props: {},
          }
        }
      }
    }
  })
}

export default withShouldNoAuthSSR

import { useCallback, useEffect, useState } from 'react'
import constate from 'constate'
import { ToastError } from '@src/utils/toast'
import { useCookie } from '@src/hooks'
import axios from 'axios'
import { validate } from '@src/core/api/auth'
import { signin } from '@src/core/api/user'
import { UserInfoShape, UserProfileShape } from '@src/core/interface/user-shape'

const useUserAuth = () => {
  const [validationTried, setValidationTried] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoShape>(null)
  const [userProfile, setUserProfile] = useState<UserProfileShape>(null)
  const [tokenCookie, _setTokenCookie] = useCookie('jwt')

  const setToken = useCallback(
    (token: string) => {
      axios.defaults.headers['Authorization'] = `Bearer ${token}`
      _setTokenCookie(token, { expires: 7 })
    },
    [_setTokenCookie]
  )

  // auto login
  useEffect(() => {
    if (!tokenCookie) {
      setValidationTried(true)
      return
    }
    setToken(tokenCookie)
    ;(async () => {
      try {
        const userData = await validate()
        setUserInfo(userData)
        setUserProfile(userData)
      } catch (err) {
        ToastError('알 수 없는 에러가 발생했습니다')
      } finally {
        setValidationTried(true)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await signin(email, password)
      setUserInfo(data.body)
      setToken(data.token)
    },
    [setToken]
  )

  return { userInfo, userProfile, validationTried, login, tokenCookie }
}

const [
  UserAuthProvider,
  useUserInfo,
  useUserProfile,
  useValidationTried,
  useLogin,
  useTokenCookie,
] = constate(
  useUserAuth,
  (value) => value.userInfo,
  (value) => value.userProfile,
  (value) => value.validationTried,
  (value) => value.login,
  (value) => value.tokenCookie
)

export {
  UserAuthProvider,
  useUserInfo,
  useUserProfile,
  useValidationTried,
  useLogin,
  useTokenCookie,
}

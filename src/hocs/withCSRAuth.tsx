import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthed, useValidationTried } from '@src/context/UserAuthContext'

const withCSRAuth = (WrappedComponent: React.ComponentType): FC => {
  const Wrapper: FC = (props) => {
    const router = useRouter()
    const validationTried = useValidationTried()
    const authed = useAuthed()

    useEffect(() => {
      if (validationTried) {
        if (!authed) {
          router.replace({
            pathname: '/login',
            query: { redirect: router.asPath },
          })
        }
      }
    }, [])

    return <>{validationTried && authed && <WrappedComponent {...props} />}</>
  }

  return Wrapper
}
export default withCSRAuth

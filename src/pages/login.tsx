import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import React, { FC } from 'react'

const Login: FC = () => {
  return <div></div>
}

export const getServerSideProps = ({
  res,
  query,
}: GetServerSidePropsContext): GetServerSidePropsResult<Record<string, unknown>> => {
  const { token, redirect, message } = query
  res.statusCode = 302

  if (!token) {
    res.setHeader('Location', '/signin')
    return { props: {} }
  }

  // otherwise, authenticate using provided token and then redirec
  res.setHeader('set-cookie', [`jwt=${token}`])
  if (redirect) {
    res.setHeader('Location', redirect)
  } else if (message) {
    res.setHeader('Location', `/?message=${message}`)
  } else {
    res.setHeader('Location', '/')
  }

  return { props: {} }
}

export default Login

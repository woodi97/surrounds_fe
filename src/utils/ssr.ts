import { validate } from '@api/auth'
import axios from 'axios'
import { GetServerSideProps } from 'next'

export const withAuthServerSideProps = (
  getServerSidePropsFunc?: GetServerSideProps
): GetServerSideProps => {
  return async (ctx) => {
    const { req, res, resolvedUrl: url } = ctx
    const token = req.cookies['jwt']
    axios.defaults.headers['Authorization'] = `Bearer ${token}`

    try {
      await validate()
      return await getServerSidePropsFunc(ctx)
    } catch (err) {
      res.statusCode = 302
      res.setHeader('Location', `/login?redirect=${url}`)
      return { props: {} }
    }
  }
}

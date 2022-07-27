import { apiValidate } from '@src/core/api/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useValidateUser() {
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        await apiValidate()
      } catch (error) {
        // Todo: need to show toast or alert or anything to user
        await router.push('/signin')
      }
    }

    checkAuth()
  }, [])
}

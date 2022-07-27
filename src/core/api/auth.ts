import { ToastError } from '@src/utils/toast'
import axios from 'axios'

export const apiValidate = async () => {
  try {
    const { data } = await axios.get('/auth/validate')
    return data
  } catch (err) {
    ToastError('error occured during validation process')
    throw err
  }
}

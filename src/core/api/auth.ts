import { ToastError } from '@src/utils/toast'
import axios from 'axios'

export const validate = async () => {
  try {
    const { data } = await axios.get('/auth/validate')
    return data.body
  } catch (err) {
    ToastError('error occured during validation process')
    throw err
  }
}

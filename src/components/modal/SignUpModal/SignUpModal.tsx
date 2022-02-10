import React, { useCallback, useState } from 'react'
import styles from './SignUpModal.module.scss'
import { Button, InputBox } from '@components/common'
import { useSignInModal } from '@src/context/ModalContext'
import { isValidEmail, isValidPassword } from '@src/utils/check'
import { ToastError, ToastSuccess } from '@src/utils/toast'
import { signup } from '@src/core/api/user'

const SignUpModal = () => {
  const openSignInModal = useSignInModal()

  const [Inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  })

  const [isValid, setValidity] = useState({
    email: false,
    password: false,
  })

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setValidity((prev) => ({
        ...prev,
        email: isValidEmail(value),
      }))
    } else if (name === 'password') {
      setValidity((prev) => ({
        ...prev,
        password: isValidPassword(value),
      }))
    }
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!isValid.email || !isValid.password || Inputs.username === '') {
      ToastError('입력값을 확인해주세요')
      return
    }
    try {
      await signup(Inputs.username, Inputs.email, Inputs.password)
      ToastSuccess('회원가입 성공 :)')
      openSignInModal()
    } catch (error) {
      ToastError('회원가입에 실패했습니다.')
    }
  }, [
    Inputs.email,
    Inputs.password,
    Inputs.username,
    isValid.email,
    isValid.password,
    openSignInModal,
  ])

  return (
    <div className={styles.cnt}>
      <InputBox
        type="id"
        name="username"
        label="Username"
        placeholder="아이디"
        value={Inputs.username}
        onChange={handleOnChange}
      />
      <InputBox
        type="email"
        name="email"
        label="Email"
        placeholder="이메일"
        value={Inputs.email}
        onChange={handleOnChange}
        error={!isValid.email}
      />
      <InputBox
        type="password"
        name="password"
        label="Password"
        placeholder="(7~16자리 숫자,영문 포함)"
        value={Inputs.password}
        onChange={handleOnChange}
        error={!isValid.password}
      />
      <Button fullWidth btnStyles="primary" type="submit" onClick={handleSubmit}>
        회원가입
      </Button>
      <span className=" text-xs text-gray-400" onClick={() => openSignInModal()}>
        로그인
      </span>
    </div>
  )
}

export default SignUpModal

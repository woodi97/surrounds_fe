import React, { FC, useCallback, useState } from 'react'
import { Button, InputBox } from '@src/components/common'
import { isValidEmail, isValidPassword } from '@src/utils/check'
import { useRouter } from 'next/router'
import { ToastError } from '@src/utils/toast'
import { useLogin } from '@src/context/UserAuthContext'
import { motion } from 'framer-motion'
import { fadeInOut } from '@src/animations/fadeInOut'

type Props = {
  onSignUpClick: () => void
}

const SignInForm: FC<Props> = ({ onSignUpClick }) => {
  const router = useRouter()
  const login = useLogin()

  const [Inputs, setInputs] = useState({
    email: '',
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
    if (!isValid.email || !isValid.password) {
      ToastError('입력값을 확인해주세요')
      return
    }
    try {
      await login(Inputs.email, Inputs.password)
      router.push('/')
    } catch (error) {
      ToastError('로그인에 실패했습니다.')
    }
  }, [Inputs, isValid, login, router])

  return (
    <motion.div className="space-y-4" variants={fadeInOut} initial="hidden" animate="visible">
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
        로그인
      </Button>
      <span className=" text-xs text-gray-400" onClick={onSignUpClick}>
        회원가입
      </span>
    </motion.div>
  )
}

export default SignInForm

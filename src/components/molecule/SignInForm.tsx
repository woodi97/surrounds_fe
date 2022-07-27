import { Button, InputBox } from '@src/components/atom'
import React, { FC, useCallback, useState } from 'react'

const SignInForm: FC<{
  onSubmit: ({ email, password }) => void
}> = ({ onSubmit }) => {
  const [{ email, password }, setInputs] = useState({
    email: '',
    password: '',
  })

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputBox
        type="email"
        name="email"
        label="Email"
        size="small"
        value={email}
        fullWidth
        onChange={handleOnChange}
      />
      <InputBox
        type="password"
        name="password"
        label="Password"
        size="small"
        value={password}
        fullWidth
        onChange={handleOnChange}
      />
      <Button className="text-white font-bold" fullWidth styles="primary" type="submit">
        Sign In
      </Button>
    </form>
  )
}

export default SignInForm

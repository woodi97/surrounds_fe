import React, { FC } from 'react'
import { Button, InputBox } from '@src/components/atom'
import { useValidateInput } from '@src/hooks'
import { commonRegex } from '@src/utils/regexUtil'

const SignUpForm: FC<{
  onSubmit: ({ name, email, password }) => void
}> = ({ onSubmit }) => {
  const [name, nameIsValid, nameError, handleNameChange] = useValidateInput(
    '',
    commonRegex.name.regex,
    commonRegex.name.desc
  )

  const [email, emailIsValid, emailError, handleEmailChange] = useValidateInput(
    '',
    commonRegex.email.regex,
    commonRegex.email.desc
  )

  const [password, pwValid, pwError, handlePwChange] = useValidateInput(
    '',
    commonRegex.password.regex,
    commonRegex.password.desc
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ name, email, password })
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <InputBox
        type="id"
        name="username"
        label="Username"
        size="small"
        value={name as string}
        error={!nameIsValid}
        errorMessage={nameError}
        fullWidth
        onChange={handleNameChange}
      />
      <InputBox
        type="email"
        name="email"
        label="Email Address"
        size="small"
        value={email as string}
        error={!emailIsValid}
        errorMessage={emailError}
        fullWidth
        onChange={handleEmailChange}
      />
      <InputBox
        type="password"
        name="password"
        label="Password"
        size="small"
        value={password as string}
        error={!pwValid}
        errorMessage={pwError}
        fullWidth
        onChange={handlePwChange}
      />
      <Button className="text-white font-bold" fullWidth styles="primary" type="submit">
        Sign Up
      </Button>
    </form>
  )
}

export default SignUpForm

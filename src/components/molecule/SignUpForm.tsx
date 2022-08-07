import { Button, InputBox } from '@src/components/atom';
import { useValidateInput } from '@src/hooks';
import { commonRegex } from '@src/utils/regexUtil';
import React, { FC } from 'react';

const SignUpForm: FC<{
  onSubmit: ({ username, email, password }) => void;
}> = ({ onSubmit }) => {
  const [username, nameIsValid, nameError, handleNameChange] = useValidateInput(
    '',
    commonRegex.name.regex,
    commonRegex.name.desc
  );

  const [email, emailIsValid, emailError, handleEmailChange] = useValidateInput(
    '',
    commonRegex.email.regex,
    commonRegex.email.desc
  );

  const [password, pwValid, pwError, handlePwChange] = useValidateInput(
    '',
    commonRegex.password.regex,
    commonRegex.password.desc
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <InputBox
        type="id"
        name="username"
        label="Username"
        value={username as string}
        error={!nameIsValid}
        errorMessage={nameError}
        fullWidth
        onChange={handleNameChange}
      />
      <InputBox
        type="email"
        name="email"
        label="Email Address"
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
  );
};

export default SignUpForm;

import classNames from 'classnames'
import React, { FC, ChangeEventHandler, MouseEventHandler } from 'react'

interface InputBoxShape {
  type: 'id' | 'email' | 'password'
  name: string
  value: string | number
  label: string
  error?: boolean
  placeholder?: string
  readOnly?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onClick?: MouseEventHandler<HTMLInputElement>
}

const InputBox: FC<InputBoxShape> = ({
  type,
  name,
  value,
  label,
  error = false,
  placeholder,
  readOnly,
  onChange,
  onClick,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block m-0 p-0 font-bold">
        {label}
      </label>
      <input
        className={classNames(
          'w-full h-10 mb-5 bg-transparent border-b-2 outline-none text-black text-base',
          { 'border-b-red-500': error }
        )}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  )
}

export default InputBox

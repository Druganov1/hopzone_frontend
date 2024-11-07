import React, { FunctionComponent, InputHTMLAttributes } from 'react'
import classNames from 'classnames/bind'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  title: string
  hasError?: boolean
  errorMsg?: string
  isPassword?: boolean
}

const TextInput: FunctionComponent<TextInputProps> = ({
  id,
  title,
  isPassword = false,
  hasError,
  errorMsg,
  ...props
}) => {
  const inputStyling = classNames(
    'p-4 border-purple-500 border-2 rounded-md bg-purple-300 text-purple-600 focus:outline-none',
  )

  return (
    <div className=" mb-5">
      <div className={`flex justify-between ${hasError ? ' text-theme-orange': 'text-purple-400'}`}>
        <label className="block mb-2 text-sm" htmlFor={id}>
          {title}
        </label>
        {hasError ? <p>{errorMsg}</p> : null}
      </div>
      <input
        className={`p-4  border-2 w-full rounded-lg bg-purple-300 text-purple-700 focus:outline-none placeholder-purple-500 ${hasError ? 'border-theme-orange': 'border-purple-500'}`}
        type={isPassword ? 'password' : 'text'}
        id={id}
        {...props}
      />
    </div>
  )
}

export default TextInput

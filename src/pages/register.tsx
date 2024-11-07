import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Form, { FormItem, InputTypes } from 'src/components/forms'
import Button from 'src/components/forms/Button'
import LandingPageLayout from 'src/components/layout/LandingPageLayout'
import {
  FirebaseError,
  LoginResponse,
  useAuth,
} from 'src/providers/AuthProvider'

const Register = () => {
  const { register } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [items, setItems] = useState<FormItem[]>([
    {
      id: 'username',
      value: '',
      label: 'Username',
      placeholder: 'eg JohnDoe',
      type: InputTypes.TEXT,
      required: true,
    },

    {
      id: 'password',
      value: '',
      label: 'Password',
      type: InputTypes.PASSWORD,
      required: true,
    },
    {
      id: 'repeatpasswword',
      value: '',
      label: 'Repeat Password',
      type: InputTypes.REPEATPASSWORD,
      required: true,
    },
  ])

  const handleSubmit = (formItems: FormItem[]) => {
    setLoading(true)
    const userName = formItems[0].value
    const email = formItems[1].value
    const password = formItems[2].value

    register(password, userName)
      .then(r => {
        router.push('/')
      })
      .catch((e: LoginResponse) => {
        if (e.errCode == FirebaseError.weakPassword) {
          setLoading(false)
          formItems[2].isFaulty = true
          formItems[2].error = 'Password too weak'
          setItems(formItems)
        }

        if (e.errCode == FirebaseError.emailInUse) {
          setLoading(false)
          formItems[1].isFaulty = true
          formItems[1].error = 'This username is already taken'
          setItems(formItems)
        }
        if (e.errCode == FirebaseError.invalidEmail) {
          setLoading(false)
          formItems[1].isFaulty = true
          formItems[1].error = 'Invalid username'
          setItems(formItems)
        }
      })
  }

  const handleRegisterBtn = () => {
    setSubmitting(true)
  }

  return (
    <LandingPageLayout>
      <div className="h-full p-8 m-auto md:w-100">
        <h1 className="mb-2 text-5xl font-semibold text-center text-theme-orange">
          REGISTER
        </h1>
        <h2 className="mb-5 text-2xl text-center">Welcome to BirbieUp!</h2>
        <Form
          setSubmitting={setSubmitting}
          submitting={submitting}
          items={items}
          setItems={setItems}
          onSubmit={handleSubmit}
        />
        {loading ? (
          <p className="mb-4 text-center ">Please wait...</p>
        ) : (
          <Button onClick={handleRegisterBtn}>REGISTER</Button>
        )}
        <p className="text-sm text-center text-purple-400 ">
          I already have an account, let me{' '}
          <Link href={'/login'}>
            <a className="font-semibold ">Login</a>
          </Link>
        </p>
      </div>
    </LandingPageLayout>
  )
}

export default Register

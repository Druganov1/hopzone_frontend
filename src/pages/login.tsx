import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import FormComponent, { FormItem, InputTypes } from 'src/components/forms'
import Button from 'src/components/forms/Button'
import DiscreteButton from 'src/components/forms/DiscreteButton'
import TextInput from 'src/components/forms/TextInput'
import PageLayout from 'src/components/layout'
import LandingPageLayout from 'src/components/layout/LandingPageLayout'
import {
  FirebaseError,
  LoginResponse,
  useAuth,
} from 'src/providers/AuthProvider'

interface Credentials {
  username: string
  password: string
}

const Login = () => {
  const { login, signInAsGuest } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [items, setItems] = useState<FormItem[]>([
    {
      id: 'username',
      value: '',
      label: 'Username',
      type: InputTypes.TEXT,
      required: true,
      placeholder: 'eg. JohnDoe',
    },
    {
      id: 'password',
      value: '',
      label: 'Password',
      type: InputTypes.PASSWORD,
      required: true,
    },
  ])

  const handleGuestBtn = () => {
    setLoading(true)
    signInAsGuest().then(r => {
      setLoading(false)
      router.push('/')
    })
  }

  const handleSubmit = (formItems: FormItem[]) => {
    setLoading(true)
    const username = formItems[0].value
    const password = formItems[1].value

    login(username, password)
      .then(r => {
        if (r.success) {
          router.push('/')
        }
      })
      .catch((error: LoginResponse) => {
        if (error.errCode == FirebaseError.invalidLoginCredentials) {
          setLoading(false)
          formItems[1].isFaulty = true
          formItems[1].error =
            'The combination of username and password is incorrect'
          setItems(items)
        }

        if (error.errCode == FirebaseError.userNotFound) {
          setLoading(false)
          formItems[0].isFaulty = true
          formItems[0].error =
            'The combination of username and password is incorrect'
          setItems(items)
        }

        if (error.errCode == FirebaseError.tooManyRequests) {
          console.log('too many requests')
        }
      })
  }

  const handleLoginBtn = () => {
    setSubmitting(true)
  }

  return (
    <LandingPageLayout>
      <div className="h-full p-8 m-auto md:w-100">
        <h1 className="mb-2 text-5xl font-semibold text-center text-theme-orange">
          LOGIN
        </h1>
        <h2 className="mb-5 text-2xl text-center">Welcome to BirbieUp!</h2>
        <FormComponent
          setSubmitting={setSubmitting}
          submitting={submitting}
          items={items}
          setItems={setItems}
          onSubmit={handleSubmit}
        />
        {loading ? (
          <p className="mb-16 text-center ">Please wait...</p>
        ) : (
          <>
            <Button onClick={handleLoginBtn}>LOG IN</Button>
          </>
        )}
        <p className="text-sm text-center text-purple-400 ">
          I don&apos;t have an account, let me{' '}
          <Link href={'/register'}>
            <a className="font-semibold ">Register</a>
          </Link>
        </p>
      </div>
    </LandingPageLayout>
  )
}

export default Login

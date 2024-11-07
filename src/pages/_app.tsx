import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'src/providers/AuthProvider'
import { SocketProvider } from 'src/providers/SocketProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </AuthProvider>
  )
}

export default MyApp

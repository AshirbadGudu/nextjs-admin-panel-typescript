import { useAppContext } from 'contexts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
type Props = {
  title?: string
  children: JSX.Element
}
export default function PublicLayout({
  title = 'Welcome To Admin Panel',
  children = <></>,
}: Props) {
  const { user } = useAppContext()
  const { push } = useRouter()
  useEffect(() => {
    ;(() => {
      if (!user) return
      if (user?.role === 'admin') return push('/admin')
    })()
  }, [user])
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

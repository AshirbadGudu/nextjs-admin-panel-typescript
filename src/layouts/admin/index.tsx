import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAppContext } from 'contexts'
import { useEffect, useState } from 'react'
import Drawer from './drawer'
import AppBar from './appbar'
type Props = {
  title?: string
  children: JSX.Element
  className?: string
}
export default function AdminLayout({
  title = 'Welcome To Admin Panel',
  children = <></>,
  className = 'bg-gradient-to-r from-slate-50 via-stone-50 to-zinc-50',
}: Props) {
  const { user } = useAppContext()
  const { push } = useRouter()
  useEffect(() => {
    ;(() => {
      if (!user) return
      if (!user?.role) return push('/login')
    })()
  }, [user])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer open={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <main
        className={`min-h-screen ${className} ${
          isOpen
            ? 'ml-[calc(100vw-calc(100vw-280px))] w-[calc(100vw-280px)]'
            : 'ml-[calc(100vw-calc(100vw-72px))] w-[calc(100vw-72px)]'
        }`}
      >
        <AppBar />
        {children}
      </main>
    </>
  )
}

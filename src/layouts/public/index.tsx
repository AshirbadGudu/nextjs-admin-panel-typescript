import Head from 'next/head'
type Props = {
  title?: string
  children: JSX.Element
}
export default function PublicLayout({
  title = 'Welcome To Admin Panel',
  children = <></>,
}: Props) {
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

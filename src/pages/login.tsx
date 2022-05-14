import { Button } from '@mui/material'
import { PublicLayout } from 'layouts'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { push } = useRouter()
  return (
    <PublicLayout>
      <main>
        <Button onClick={() => push('/admin')}>Admin</Button>
      </main>
    </PublicLayout>
  )
}

export default Login

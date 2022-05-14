import { Button } from '@mui/material'
import { AdminLayout } from 'layouts'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { push } = useRouter()
  return (
    <AdminLayout title="Dashboard - Admin Panel">
      <main>
        <Button onClick={() => push('/')}>Admin</Button>
      </main>
    </AdminLayout>
  )
}

export default Login

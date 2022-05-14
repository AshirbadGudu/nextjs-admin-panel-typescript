import { Loader } from 'components/core'
import { useAppContext } from 'contexts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default () => {
  const { push } = useRouter()
  const { user } = useAppContext()
  useEffect(() => {
    ;(() => {
      if (!user) return
      if (!user?.role) return push('/login')
      if (user?.role === 'admin') return push('/admin')
    })()
  }, [user])
  return <Loader visible={user === null} />
}

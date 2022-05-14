import { ThemeProvider } from '@mui/material'
import { Loader } from 'components/core'
import { auth, database } from 'configs'
import { useIsMounted } from 'hooks'
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useCustomTheme } from 'themes'
import { AppContextType, AppContextProviderType, User } from 'types'

const AppContext = createContext<AppContextType>({})

const AppContextProvider = (props: AppContextProviderType) => {
  const [user, setUser] = useState<Partial<User> | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isMounted = useIsMounted()
  const updateUser = useCallback(
    async (updatedUserData: Partial<User>) => {
      isMounted.current && setUser(updatedUserData)
    },
    [isMounted]
  )

  useEffect(() => {
    const onAuthStateChange = async () => {
      auth.onAuthStateChanged((user) => {
        isMounted.current && setLoading(true)
        if (!user) {
          isMounted.current && setLoading(false)
          isMounted.current && setUser({})
          if (
            router.pathname?.includes('platform') ||
            router.pathname?.includes('admin')
          )
            return router.push('/')
        }
        database.ref(`Users/${user?.uid}`).on('value', (snap) => {
          if (!snap.exists()) return isMounted.current && setLoading(false)
          const updatedUserData = snap.val() as User
          isMounted.current &&
            setUser((prev) => ({
              ...prev,
              ...updatedUserData,
            }))
          isMounted.current && setLoading(false)
        })
      })
    }
    onAuthStateChange()
  }, [isMounted, router])

  const { theme } = useCustomTheme()
  return (
    <AppContext.Provider value={{ user, updateUser }}>
      <ThemeProvider theme={theme}>
        <Loader visible={loading} />
        {props.children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppContextProvider

import { ThemeProvider } from '@mui/material'
import { Loader } from 'components/core'
import { useIsMounted } from 'hooks'
import { useRouter } from 'next/router'
import {
  createContext,
  ReactChild,
  ReactFragment,
  ReactPortal,
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
      isMounted.current &&
        setUser((prev) => ({
          ...prev,
          ...updatedUserData,
        }))
    },
    [isMounted]
  )

  useEffect(() => {
    const onAuthStateChange = async () => {
      setTimeout(() => {
        isMounted.current && setLoading(false)
        isMounted.current && updateUser({})
      }, 2000)
    }
    onAuthStateChange()
  }, [isMounted, router, updateUser])

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

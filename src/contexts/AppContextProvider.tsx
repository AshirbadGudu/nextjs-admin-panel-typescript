import { ThemeProvider } from '@mui/material'
import { Loader } from 'components/core'
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

const AppContext = createContext<any>({})

const AppContextProvider = (props: any) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isMounted = useIsMounted()
  const updateUser = useCallback(
    async (updatedUserData: any) => {
      isMounted.current &&
        setUser((prev: any) => ({
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
      }, 2000)
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

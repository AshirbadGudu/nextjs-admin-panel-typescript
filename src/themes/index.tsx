import { createTheme } from '@mui/material/'
import { purple } from '@mui/material/colors'
import { useState } from 'react'

export const useCustomTheme = () => {
  const [theme] = useState(
    createTheme({
      palette: {
        primary: {
          main: purple[700],
        },
      },
      typography: {
        fontFamily: '"Poppins", sans-serif',
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              paddingBottom: '8px',
              paddingTop: '8px',
            },
            contained: {
              boxShadow: '#0002 0px 8px 16px 0px',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              boxShadow: '#0002 0px 8px 16px 0px',
            },
          },
        },
      },
    })
  )
  return { theme }
}

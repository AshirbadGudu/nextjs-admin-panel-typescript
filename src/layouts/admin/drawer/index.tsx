import { Fragment, useState } from 'react'
import {
  Box,
  List,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Button,
  ListItemButton,
  Collapse,
} from '@mui/material'
import {
  ExitToApp,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Menu,
} from '@mui/icons-material'
import { CustomDrawer, CustomDrawerHeader } from './custom'
import { ICONS, LOGO } from 'assets'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useMenuItems } from 'hooks'
import { useAppContext } from 'contexts'
import { auth } from 'configs'

type DrawerType = {
  onToggle?: () => void
  open?: boolean
}

const Drawer = ({ open, onToggle }: DrawerType) => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const { value } = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!',
        cancelButtonText: 'No, cancel!',
      })
      if (!value) return
      await auth.signOut()
      return router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }
  const [selectedSubMenu, setSelectedSubMenu] = useState('')
  const MenuItems = useMenuItems()
  const { user } = useAppContext()
  return (
    <>
      <CustomDrawer variant="permanent" open={open}>
        <CustomDrawerHeader>
          <div className="flex h-16 w-full items-center justify-center gap-4">
            <img
              src={LOGO}
              alt=""
              className={`${open ? 'w-30 inline-block h-10' : 'hidden'}`}
            />
            <IconButton onClick={onToggle}>
              {open ? <ChevronLeft /> : <Menu />}
            </IconButton>
          </div>
        </CustomDrawerHeader>
        <Divider />
        {/* Render Menu Items */}
        <List sx={{ mt: '1px' }}>
          {MenuItems.map((item) => (
            <Fragment key={item.key}>
              <Tooltip
                title={item.title}
                followCursor
                arrow
                placement="top-end"
              >
                <ListItemButton
                  onClick={() => {
                    if (item?.route) return router?.push(item?.route)
                    item?.submenus &&
                      setSelectedSubMenu((prev) =>
                        prev === item.key ? '' : item.key
                      )
                  }}
                  selected={
                    item?.submenus
                      ? selectedSubMenu === item?.key
                      : router?.pathname === item.route
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item?.submenus &&
                    (selectedSubMenu === item?.key ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </Tooltip>
              {item?.submenus && (
                <Collapse
                  in={selectedSubMenu === item?.key}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item?.submenus.map((submenu: any) => (
                      <ListItemButton
                        onClick={() => router.push(submenu.route)}
                        sx={{ pl: 4 }}
                        selected={router.pathname === submenu.route}
                        key={submenu?.key}
                      >
                        <ListItemIcon>{submenu?.icon}</ListItemIcon>

                        <ListItemText
                          primary={submenu?.title}
                          sx={{ whiteSpace: 'break-spaces' }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
              <Divider />
            </Fragment>
          ))}

          <Box hidden={open}>
            <Tooltip
              title={'Click Here To Logout'}
              followCursor
              arrow
              placement="top-end"
            >
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </Tooltip>
          </Box>
        </List>
        <Box hidden={!open} sx={{ textAlign: 'center' }}>
          <Typography>
            {'Hi'} {user?.displayName},
          </Typography>
          <Typography variant="caption">{'Click here to logout'}</Typography>
          <div className="py-5">
            <Button
              variant="contained"
              onClick={handleLogout}
              startIcon={<ExitToApp />}
              color="error"
              className="bg-red-500"
            >
              Logout
            </Button>
          </div>
        </Box>
      </CustomDrawer>
    </>
  )
}

export default Drawer

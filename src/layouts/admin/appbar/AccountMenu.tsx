import { Logout } from '@mui/icons-material'
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { ICONS } from 'assets'
import { auth } from 'configs'
import { useAppContext } from 'contexts'
import { useRouter } from 'next/router'
import { MouseEvent, useState } from 'react'
import Swal from 'sweetalert2'
const bgcolor = `#${Math.random().toString().slice(2, 8)}`
export default function AccountMenu() {
  const { user } = useAppContext()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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

  return (
    <>
      <button
        className="flex items-center gap-2"
        onClick={(event: MouseEvent<HTMLElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        <Avatar className="border" src={user?.photoURL} sx={{ bgcolor }}>
          {user?.displayName?.[0]}
        </Avatar>
        <div className="hidden text-left lg:block">
          <h4 className="text-sm">{user?.displayName}</h4>
          <p className="text-xs text-gray-600">{user?.email}</p>
        </div>
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => router.push('/admin/edit-profile')}>
          <ListItemIcon>
            <ICONS.Edit className="h-5 w-5" />
          </ListItemIcon>
          {'Edit Profile'}
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          {'Logout'}
        </MenuItem>
      </Menu>
    </>
  )
}

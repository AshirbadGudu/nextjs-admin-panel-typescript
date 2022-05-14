import {
  Dashboard,
  People,
  Settings,
  Key,
  EmailOutlined,
  Help,
  Notifications,
} from '@mui/icons-material'
import { useAppContext } from 'contexts'

export default () => {
  const { user } = useAppContext()

  if (!user) return []
  if (user?.role === 'admin')
    return [
      {
        key: '1',
        title: 'Dashboard',
        icon: <Dashboard />,
        route: '/admin/',
      },
      {
        key: '2',
        title: 'Notifications',
        icon: <Notifications />,
        route: '/admin/notifications',
      },
      {
        key: '3',
        title: 'Settings',
        icon: <Settings />,
        submenus: [
          {
            key: '3.1',
            route: '/admin/change-password',
            title: 'Change Password',
            icon: <Key />,
          },
          {
            key: '3.2',
            route: '/admin/update-email',
            title: 'Update Email',
            icon: <EmailOutlined />,
          },
        ],
      },
      {
        key: '4',
        title: 'Users',
        icon: <People />,
        route: '/admin/users',
      },

      {
        key: '5',
        title: 'Support',
        icon: <Help />,
        route: '/admin/support',
      },
    ]
  return []
}

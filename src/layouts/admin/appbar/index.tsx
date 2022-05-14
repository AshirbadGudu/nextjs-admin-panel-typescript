import { Badge } from '@mui/material'
import { ICONS } from 'assets'
import { useAppContext } from 'contexts'
import { useFetch } from 'hooks'
import Link from 'next/link'
import { NotificationType } from 'types'
import AccountMenu from './AccountMenu'
export default function AppBar() {
  const { user } = useAppContext()
  const [notifications] = useFetch<NotificationType[]>(
    `notifications/${user?.uid}`,
    {
      filter: (notification: NotificationType) => !notification.isRead,
    }
  )
  return (
    <>
      <header className={`h-16 bg-white shadow`}>
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="hidden text-xl lg:block">Admin Panel</h1>
          <div className="flex items-center gap-6">
            <Badge badgeContent={notifications?.length || 0} color="warning">
              <Link href="/admin/notifications">
                <a className="cursor-pointer rounded-lg bg-amber-100 p-2">
                  <ICONS.Notification className="h-6 w-6 text-amber-700" />
                </a>
              </Link>
            </Badge>
            <Badge color="primary" variant="dot" invisible>
              <Link href="/admin/users">
                <a className="cursor-pointer rounded-lg bg-blue-100 p-2">
                  <ICONS.Users className="h-6 w-6 text-blue-700" />
                </a>
              </Link>
            </Badge>
            <AccountMenu />
          </div>
        </div>
      </header>
    </>
  )
}

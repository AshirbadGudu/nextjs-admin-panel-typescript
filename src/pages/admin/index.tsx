import { ICONS } from 'assets'
import { StatisticsCard } from 'components/admin'
import { AdminLayout } from 'layouts'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { push } = useRouter()
  return (
    <AdminLayout title="Dashboard - Admin Panel">
      <section className="px-3 py-2 lg:px-6 lg:py-3">
        <StatisticsCard
          className="h-76 w-full lg:w-[65%]"
          data={[
            {
              img: <ICONS.Users className="h-8 w-8" />,
              title: 'Users',
              count: '30',
              className: 'bg-purple-600',
            },
            {
              img: <ICONS.Notification className="h-8 w-8" />,
              title: 'Notifications',
              count: '16',
              className: 'bg-green-500',
            },
            {
              img: <ICONS.Auditorium className="h-8 w-8" />,
              title: 'Events',
              count: '1',
              className: 'bg-orange-500',
            },
            {
              img: <ICONS.Help className="h-8 w-8" />,
              title: 'Supports',
              count: '1',
              className: 'bg-sky-500',
            },
          ]}
        />
      </section>
    </AdminLayout>
  )
}

export default Login

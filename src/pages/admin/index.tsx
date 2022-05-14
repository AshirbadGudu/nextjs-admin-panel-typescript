import { ICONS } from 'assets'
import { InfoCards, StatisticsCard } from 'components/admin'
import { AdminLayout } from 'layouts'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { push } = useRouter()
  return (
    <AdminLayout title="Dashboard - Admin Panel">
      <section className="px-3 py-2 lg:px-6 lg:py-3">
        <div className="flex justify-between gap-2">
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
          <InfoCards
            className={`w-full lg:w-[38%]`}
            data={[
              {
                icon: <ICONS.Users className="h-8 w-8" />,
                title: 'Users',
                className: 'border-b border-r',
                count: `${'10'}`,
              },
              {
                icon: <ICONS.Notification className="h-8 w-8" />,
                title: 'Notifications',
                className: 'border-b',
                count: `${'10'}`,
              },
              {
                icon: <ICONS.Auditorium className="h-8 w-8" />,
                title: 'Events',
                className: 'border-r',
                count: `${'10'}`,
              },
              {
                icon: <ICONS.Help className="h-8 w-8" />,
                title: 'Supports',
                className: '',
                count: `${'10'}`,
              },
            ]}
          />
        </div>
      </section>
    </AdminLayout>
  )
}

export default Login

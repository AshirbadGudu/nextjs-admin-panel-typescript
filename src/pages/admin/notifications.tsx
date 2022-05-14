import { AdminLayout } from 'layouts'
import { ICONS } from 'assets'
import { NOT_FOUND } from 'assets/animations'
import { Empty } from 'components/core'
import { database } from 'configs'
import { useAppContext } from 'contexts'
import { useFetch } from 'hooks'
import moment from 'moment'
import { Fragment } from 'react'
import Swal from 'sweetalert2'
import { NotificationType } from 'types'

export default () => {
  const { user } = useAppContext()
  const [notifications] = useFetch<NotificationType[]>(
    `notifications/${user?.uid}`
  )
  const deleteAllNotifications = async () => {
    const { value } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
    if (!value) return
    await database.ref(`notifications/${user?.uid}`).remove()
    Swal.fire('Deleted!', 'Your notifications has been deleted.', 'success')
  }
  return (
    <AdminLayout title="Notifications | Admin Panel" className="bg-white">
      <>
        <section className="px-12 py-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold leading-6 text-gray-800">
              Notifications
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-md bg-green-300 px-4 py-2 shadow-md">
                Read All
              </button>
              <button
                className="rounded-md bg-red-300 px-4 py-2 shadow-md"
                onClick={deleteAllNotifications}
              >
                Delete All
              </button>
            </div>
          </div>

          {notifications?.length ? (
            <>
              {notifications?.map(
                ({ id, title, message, createdAt, isRead }) => (
                  <Fragment key={id}>
                    <div
                      className="mt-4 flex w-full cursor-pointer items-center rounded bg-white p-3 shadow duration-300 hover:shadow-lg"
                      onClick={() => {
                        Swal.fire({
                          title: title,
                          html: message,
                          showCloseButton: true,
                        })
                        database
                          .ref(`notifications/${user?.uid}/${id}`)
                          .update({ isRead: true })
                      }}
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                        <ICONS.Notification
                          className={`h-6 w-6 ${
                            isRead ? 'text-black' : 'text-sky-700'
                          }`}
                        />
                      </div>
                      <div className="flex w-full items-center justify-between pl-3">
                        <div className="grid w-4/5 gap-2">
                          <h4
                            className={`text-lg leading-none ${
                              isRead ? 'text-black' : 'text-sky-700'
                            }`}
                          >
                            {title}
                          </h4>
                          <p className="text-sm leading-5 text-gray-500">
                            {moment(new Date(createdAt)).fromNow()}
                          </p>
                        </div>
                        <p className="flex cursor-pointer text-xs leading-3">
                          <ICONS.ChevronRight
                            className={`h-6 w-6 text-black`}
                          />
                        </p>
                      </div>
                    </div>
                  </Fragment>
                )
              )}
            </>
          ) : (
            <Empty title={'No notifications yet'} src={NOT_FOUND.src} />
          )}
        </section>
      </>
    </AdminLayout>
  )
}

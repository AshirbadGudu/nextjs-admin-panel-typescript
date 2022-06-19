import { IOSSwitch } from 'components/core'
import { AdminLayout } from 'layouts'
import { database } from 'configs'
import { useFetch } from 'hooks'
import moment from 'moment'
import Swal from 'sweetalert2'
import { User } from 'types'
import { MuiTblOptions } from 'utils'
import MaterialTable from '@material-table/core'
import { Avatar } from '@mui/material'

export default function Users() {
  const [data] = useFetch<User[]>('Users')
  const toggleStallStatus = async (user: User) => {
    await database
      .ref(`Users/${user.uid}`)
      .update({ isBlocked: !user.isBlocked, updatedAt: new Date().toString() })
  }
  const sendNotificationToSelectedUsers = async (users: User[]) => {
    const { value: title } = await Swal.fire({
      title: "What's the title of the notification?",
      input: 'text',
      inputLabel: 'Title',
      inputPlaceholder: "e.g. 'You have been blocked from using the app'",
      confirmButtonText: 'Next',
    })
    if (!title)
      return Swal.fire(
        'Cancelled',
        "You didn't enter a title for the notification",
        'error'
      )
    const { value: message } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: "e.g. 'You have been blocked from using the app'",
      showCancelButton: true,
      confirmButtonText: 'Send Notification',
    })
    if (!message)
      return Swal.fire(
        'Cancelled',
        "You didn't enter a message for the notification",
        'error'
      )
    Swal.fire(
      'Please Wait',
      "We're sending the notification to the selected users",
      'info'
    )
    for (const selectedUser of users) {
      await database.ref(`notifications/${selectedUser?.uid}`).push({
        title,
        message,
        createdAt: new Date().toString(),
        isRead: false,
      })
    }
    Swal.fire('Success', 'successfully Notifications Sent', 'success')
  }
  return (
    <AdminLayout title="Users - Admin Panel">
      <div className="px-4 py-4">
        <MaterialTable
          isLoading={data === null}
          title={'Users'}
          options={{ ...MuiTblOptions(), selection: true, filtering: true }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '5%',
              filtering: false,
            },
            {
              title: 'Name',
              field: 'displayName',
              hideFilterIcon: true,
              render: ({ displayName, photoURL, email }) => (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={photoURL}
                      sx={{
                        bgcolor: `#${Math.random().toString().slice(2, 8)}`,
                      }}
                      className={`shadow`}
                    >
                      {displayName?.[0]}
                    </Avatar>
                    <div className="">
                      <h4 className="">{displayName}</h4>
                      <h6 className="text-sm text-gray-500">{email}</h6>
                    </div>
                  </div>
                </>
              ),
            },
            {
              title: 'Email',
              field: 'email',
              hidden: true,
              export: true,
            },
            {
              title: 'Password',
              field: 'password',
              hidden: true,
              export: true,
            },
            {
              title: 'Role',
              field: 'role',
              lookup: {
                admin: 'Admin',
                user: 'User',
              },
            },
            {
              title: 'Created At',
              field: 'createdAt',
              render: ({ createdAt }: User) =>
                moment(new Date(createdAt)).format('LLL'),
              editable: 'never',
              type: 'date',
            },
            {
              title: 'Updated At',
              field: 'updatedAt',
              render: ({ updatedAt }: User) =>
                moment(new Date(updatedAt)).fromNow(),
              editable: 'never',
              type: 'date',
            },
            {
              title: 'Is Blocked',
              field: 'isBlocked',
              render: (user: User) => (
                <IOSSwitch
                  checked={user?.isBlocked}
                  onChange={() => toggleStallStatus(user)}
                />
              ),
              editable: 'never',
              type: 'boolean',
            },
          ]}
          data={data === null ? [] : data?.map((_, i) => ({ ..._, sl: i + 1 }))}
          actions={[
            {
              icon: 'notifications',
              tooltip: 'Send Notification To Selected Users',
              onClick: async (event, rowData) => {
                const selectedUsers = rowData as User[]
                sendNotificationToSelectedUsers(selectedUsers)
              },
            },
          ]}
        />
      </div>
    </AdminLayout>
  )
}

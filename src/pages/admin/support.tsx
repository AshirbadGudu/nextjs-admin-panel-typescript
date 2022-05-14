import { AdminLayout } from 'layouts'
import MaterialTable from '@material-table/core'
import { MuiTblOptions } from 'utils'
import { useFetch } from 'hooks'
import moment from 'moment'
import { Support } from 'types'
export default () => {
  const [data, isLoading] = useFetch<Support[]>(`/Supports`, {
    needNested: true,
  })
  console.log(data)
  return (
    <AdminLayout title="Support - Admin Panel">
      <div className="px-12 py-4">
        <MaterialTable
          title={'Support'}
          isLoading={isLoading}
          data={
            data === null
              ? []
              : data?.map((_: any, i: number) => ({
                  ..._,
                  sl: i + 1,
                }))
          }
          options={{ ...MuiTblOptions() }}
          columns={[
            {
              title: '#',
              field: 'sl',
              editable: 'never',
              width: '5%',
            },
            {
              title: 'Name',
              field: 'displayName',
            },
            {
              title: 'Email',
              field: 'email',
            },
            {
              title: 'Subject',
              field: 'subject',
            },
            {
              title: 'Sent At',
              field: 'timestamp',
              render: ({ timestamp }: any) =>
                moment(new Date(timestamp)).format('LLL'),
            },
          ]}
          detailPanel={({ rowData }) => {
            return (
              <section className="px-12 py-4">
                <h5 className="mb-2 text-xl">{'Message'}</h5>
                <p className="text-lg text-gray-600">{rowData?.message}</p>
              </section>
            )
          }}
        />
      </div>
    </AdminLayout>
  )
}

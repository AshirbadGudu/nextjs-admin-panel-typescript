import { Options } from '@material-table/core'
import { ExportCsv, ExportPdf, IColum } from '@material-table/exporters'

export const MuiTblOptions = () => {
  const options: Options<any> = {
    actionsColumnIndex: -1,
    pageSize: 10,
    addRowPosition: 'first',
    detailPanelColumnAlignment: 'right',
    exportAllData: true,
    exportMenu: [
      {
        label: 'Export All Data In CSV',
        exportFunc: (cols: any, data: any) => ExportCsv(cols, data, 'AllData'),
      },
      {
        label: 'Export All Data In PDF',
        exportFunc: (cols: any, data: any) => ExportPdf(cols, data, 'AllData'),
      },
    ],
  }
  return options
}

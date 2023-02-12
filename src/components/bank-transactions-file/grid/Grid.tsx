import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridCellModes,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { useRouter } from 'next/router'
import { money } from 'common/util/money'
import { ModalStore } from '../BankTransactionsPage'
import { getExactDateTime } from 'common/util/date'
import { BankImportStatus } from 'gql/donations'

interface RenderCellProps {
  params: GridRenderCellParams
}

export default observer(function Grid() {
  const { t } = useTranslation()

  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState<number>(0)

  const router = useRouter()
  console.log(router.query)
  const data: BankImportStatus[] = router.query as BankImportStatus[]
  const { isDetailsOpen } = ModalStore
  //const status = router.query.campaignId as string | undefined

  const RenderMoneyCell = ({ params }: RenderCellProps) => {
    return <>{money(params.row.amount, params.row.currency)}</>
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'createdAt',
      headerName: t('donations:date'),
      ...commonProps,
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        return getExactDateTime(params?.row.createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('donations:status'),
    },
    {
      field: 'message',
      headerName: 'Message', //TODO: Use translation here
      width: 250,
    },
    {
      field: 'amount',
      headerName: t('donations:amount'),
      renderCell: (params: GridRenderCellParams) => {
        return <RenderMoneyCell params={params} />
      },
    },
    {
      field: 'currency',
      headerName: t('donations:currency'),
      ...commonProps,
      width: 100,
    },
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
  ]

  return (
    <>
      <Box sx={{ marginTop: '2%', mx: 'auto', width: 700 }}>
        <DataGrid
          style={{
            background: 'white',
            position: 'absolute',
            height: 'calc(100vh - 300px)',
            border: 'none',
            width: 'calc(100% - 48px)',
            left: '24px',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: '0 0 13px 13px',
          }}
          rows={data || []}
          columns={columns}
          rowsPerPageOptions={[5, 10]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          disableSelectionOnClick
        />
      </Box>
    </>
  )
})

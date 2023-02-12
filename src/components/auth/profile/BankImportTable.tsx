import {
  Card,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Grid,
  Table,
  TableRow,
  Box,
} from '@mui/material'
import React, { useMemo } from 'react'
import { bg, enUS } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

import theme from 'common/theme'
import { money } from 'common/util/money'
import { BankImportStatus } from 'gql/donations' //TOdo move another
import { routes } from 'common/routes'
import { getExactDateTime } from 'common/util/date'

export type BankTableProps = {
  bankImportStatus: BankImportStatus[] | undefined
}
function BankImporsTable({ bankImportStatus }: BankTableProps) {
  const { t, i18n } = useTranslation()
  const [fromDate, setFromDate] = React.useState<Date | null>(null)
  const [toDate, setToDate] = React.useState<Date | null>(null)
  return (
    <Card sx={{ padding: theme.spacing(2), boxShadow: theme.shadows[0] }}>
      <Grid container alignItems={'flex-start'} spacing={theme.spacing(2)}>
        <LocalizationProvider
          adapterLocale={i18n.language === 'bg' ? bg : enUS}
          dateAdapter={AdapterDateFns}>
          <Grid item xs={12} sm={3}>
            <DateTimePicker
              label={t('profile:donations.fromDate')}
              value={fromDate}
              onChange={setFromDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DateTimePicker
              label={t('profile:donations.toDate')}
              value={toDate}
              onChange={setToDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      {bankImportStatus?.length ? (
        <TableContainer>
          <Table sx={{ minWidth: 650, backgroundColor: 'white' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('profile:donations.date')}</TableCell>
                <TableCell>{t('profile:donations.status.header')}</TableCell>
                <TableCell>{t('profile:donations.sort')}</TableCell>
                <TableCell>{t('profile:donations.cause')}</TableCell>
                <TableCell>{t('profile:donations.amount')}</TableCell>
                <TableCell>{t('profile:donations.certificate')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankImportStatus.map((importStatus, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{getExactDateTime(importStatus.createdAt)}</TableCell>
                  <TableCell>{`${t('profile:donations.status.' + importStatus.status)}`}</TableCell>
                  <TableCell>{importStatus.message}</TableCell>
                  <TableCell>{money(importStatus.amount)}</TableCell>
                  <TableCell>{money(importStatus.amount)}</TableCell>
                  <TableCell>{money(importStatus.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ fontSize: 20, mt: 4 }}>{t('profile:donations.noDonations')}</Box>
      )}
    </Card>
  )
}

export default BankImporsTable

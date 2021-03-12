import React, { useState, useEffect } from 'react'
//material ui components
import { TextField, Paper, Button, Typography, Box, Badge, Tabs, Tab, Chip } from '@material-ui/core'
//custom components
import DatePicker from '@components/common/DatePicker'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'

//material ui icons
import DateRangeIcon from '@material-ui/icons/DateRange'
//moment js
import moment from 'moment'

import useTranslation from 'hooks/useTranslation'

import MaterialTable from 'material-table'
import { useStylesUserManager } from 'styles/user-manager-styles'
import { checkGetAllUserLogs } from '@utils/helpers'
import { useSelector } from 'react-redux'
import { RootState } from '@store/reducers'
import dynamic from 'next/dynamic'
import { ServiceStatisticsManager } from '@Services/API/StatisticsManager'
import { IUserLog } from '@Interfaces'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

/* Tracer Manager Component */
export default function UserLogs() {
  const classes = useStylesUserManager()
  const [openDateRange, setOpenDateRange] = useState(false)
  var startDate = new Date()
  startDate.setDate(startDate.getDate() - 1)
  const [dateRange, setDateRange] = useState(() => {
    return {
      startDate,
      endDate: new Date(),
      key: 'selection',
    }
  })
  const [search, setSearch] = useState('')

  const [userLogs, setUserLogs] = useState<IUserLog[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const state = useSelector((state: RootState) => {
    return {
      username: state.auth.username,
    }
  })

  const { t, locale } = useTranslation()

  moment.locale(locale)

  useEffect(() => {
    handeFetchUserLogs()
  }, [])

  const handeFetchUserLogs = () => {
    setIsLoading(true)
    const params = {
      search: search,
      fromTS: dateRange.startDate.getTime(),
      toTS: dateRange.endDate.getTime(),
    }

    ServiceStatisticsManager.getUserLogs(params)
      .then((res) => {
        console.log(res)
        if (res.result) {
          setUserLogs(res.result.userLogs)
        }

        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Title>{t('search')}</Title>
        <form noValidate>
          <Chip
            variant="outlined"
            size="medium"
            icon={<DateRangeIcon />}
            label={`${t('from')}: ${moment(dateRange.startDate).format('DD MMMM YYYY ')}   ${t('to')}: ${moment(
              dateRange.endDate
            ).format('DD MMMM YYYY ')}`}
            clickable
            color="primary"
            onClick={() => setOpenDateRange(true)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="search"
            label={t('search')}
            name="search"
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            onClick={handeFetchUserLogs}
            disabled={isLoading}
          >
            {t('search')}
          </Button>
        </form>
      </Paper>
      <MaterialTable
        title={t('userLogs')}
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: '' } }}
        columns={[
          { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
          { title: t('username'), field: 'account_id' },
          { title: t('method'), field: 'method' },

          { title: t('ip'), field: 'ip' },

          {
            title: t('dateTime'),
            field: 'ts',
            render: (rowData) => rowData.ts && moment(rowData.ts).format('DD MMM YYYY HH:mm'),
          },
          {
            title: t('data'),
            field: 'data',
            render: (rowData) =>
              rowData.data && (
                <ReactJson
                  src={JSON.parse(rowData.data)}
                  displayObjectSize={false}
                  displayDataTypes={false}
                  collapsed={0}
                  enableClipboard={false}
                  name={false}
                />
              ),
          },
        ]}
        data={userLogs}
        options={{
          sorting: false,
          pageSize: 10,
          exportButton: true,
        }}
      />
      <DatePicker
        ranges={dateRange}
        open={openDateRange}
        onClose={() => setOpenDateRange(false)}
        onChange={(e) => setDateRange(e.selection)}
      />
    </>
  )
}

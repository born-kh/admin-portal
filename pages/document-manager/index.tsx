import React, { useState, useEffect } from 'react'
//material-ui components
import {
  Paper,
  Button,
  Typography,
  Box,
  Badge,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  Tabs,
  Tab,
  Select,
} from '@material-ui/core'
//custom components
import Dashboard from '@components/Dashboard'
import DatePicker from '@components/common/DatePicker'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ApplicationTable from '@components/DocumentManager/ApplicationTable'
//moment js lib
import moment from 'moment'
//document-manager interfaces
import {
  Application,
  FilterAnyApplication,
  FilterDateRange,
  FilterApplicationParams,
  FetchApplicationsResponse,
} from '@interfaces/document-manager'
import { useRouter } from 'next/router'
// next props-types
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
// constants
import { applicationOptions, dateOptions } from '@utils/constants'
import Autorenew from '@material-ui/icons/Autorenew'
//document-managaer REST APIS
import { documentAPI } from 'service/api'

import { useStyles } from './styles'
import useTranslation from 'hooks/useTranslation'
import { fetchNewApplicationsAction, fetchAnyApplicationsAction } from '@store/document/actions'
import { RootState, AppDispatch } from '@store/reducers'
//react-redux hooks
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_PAGE_NEW_APPLICATION } from '@store/document/types'
import TabPanel from '@components/common/TabPanel'

export default function (props: any) {
  const classes = useStyles()
  const [openDateRange, setOpenDateRange] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const router = useRouter()
  const [valueTab, setValueTab] = useState(props.tabValue)

  const [anyApplication, setAnyApplication] = useState<{ page: number; pageSize: number }>({
    page: 0,
    pageSize: 5,
  })

  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: RootState) => {
    return {
      newApplication: state.document.newApplication,
      anyApplication: state.document.anyApplication,
    }
  })

  const [isLoadingAny, setIsLoadingAny] = useState(false)
  const [isLoadingNew, setIsLoadingNew] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState('ALL')
  const [selectedDateType, setSelectedDateType] = useState('ALL')
  const { t, locale } = useTranslation()
  moment.locale(locale)
  const handleChange = (newValue: number) => {
    setValueTab(newValue)
  }

  const handleChangeAnyPage = (value: number) => {
    fetchAnyApplications(value, anyApplication.pageSize)
  }

  const handleChangeAnyPageSize = (value: number) => {
    fetchAnyApplications(anyApplication.page, value)
  }

  const handleChangeNewPage = (value: number) => {
    fetchNewApplications(value, state.newApplication.pageSize)
  }

  const handleChangeNewPageSize = (value: number) => {
    fetchNewApplications(state.newApplication.page, value)
  }

  useEffect(() => {
    if (valueTab === 1) {
      router.push({
        pathname: '/document-manager',
        query: { applications: 'any' },
      })
    } else if (valueTab === 0) {
      router.push({
        pathname: '/document-manager',
        query: { applications: 'new' },
      })
    }
    fetchAnyApplications(anyApplication.page, anyApplication.pageSize)
    fetchNewApplications(state.newApplication.page, state.newApplication.pageSize)
  }, [valueTab])

  const fetchNewApplications = (start: number, count: number) => {
    setIsLoadingNew(true)
    dispatch(fetchNewApplicationsAction({ start: start * count, count }))
      .then(() => {
        dispatch({ type: CHANGE_PAGE_NEW_APPLICATION, payload: { page: start, pageSize: count } })
        setIsLoadingNew(false)
      })
      .catch(() => {
        setIsLoadingNew(false)
      })
  }

  const fetchAnyApplications = (start: number, count: number) => {
    setIsLoadingAny(true)
    let filterParams: FilterApplicationParams = { start: start * count, count }
    let filter: FilterAnyApplication = {}
    let range: FilterDateRange = { type: '', from: '', to: '' }
    if (selectedApplication !== 'ALL') {
      filter.status = selectedApplication
    }
    if (selectedDateType !== 'ALL') {
      range.type = selectedDateType
      range.from = dateRange.startDate.toISOString().split('.')[0] + 'Z'
      range.to = dateRange.endDate.toISOString().split('.')[0] + 'Z'
      filter.range = range
    }
    filterParams.filter = filter
    dispatch(fetchAnyApplicationsAction(filterParams))
      .then(() => {
        setAnyApplication({ page: start, pageSize: count })
        setIsLoadingAny(false)
      })
      .catch(() => {
        setIsLoadingAny(false)
      })
  }

  return (
    <>
      <Paper style={{ paddingTop: 10 }}>
        <Tabs
          value={valueTab}
          onChange={(e, newValue) => handleChange(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={
              <Badge badgeContent={state.newApplication.totalCount} color="secondary">
                {' '}
                {t('newDocuments')}
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={state.anyApplication.totalCount} color="secondary">
                {t('anyDocuments')}
              </Badge>
            }
          />
        </Tabs>
        <TabPanel value={valueTab} index={0}>
          <ApplicationTable
            type={'new applications'}
            isLoading={isLoadingNew}
            data={state.newApplication}
            handleChangePage={handleChangeNewPage}
            handleChangePageSize={handleChangeNewPageSize}
          />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <div className={classes.paper}>
            <div>
              <FormControl variant="outlined" className={classes.formControl} style={{ margin: '20px 5px' }}>
                <InputLabel id="application">{t('setApplicationStatus')}</InputLabel>

                <Select
                  labelId="application"
                  id="application"
                  name="application"
                  value={selectedApplication}
                  onChange={(e: React.ChangeEvent<any>) => setSelectedApplication(e.target.value)}
                  label={t('setApplicationStatus')}
                >
                  {applicationOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl} style={{ margin: '20px 5px' }}>
                <InputLabel id="SetTypeDate">{t('setTypeDate')}</InputLabel>

                <Select
                  labelId="SetTypeDate"
                  id="SetTypeDate"
                  name="SetTypeDate"
                  value={selectedDateType}
                  onChange={(e: React.ChangeEvent<any>) => setSelectedDateType(e.target.value)}
                  label={t('setTypeDate')}
                >
                  {dateOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <Chip
                variant="outlined"
                size="medium"
                style={{ width: 350 }}
                icon={<DateRangeIcon />}
                label={`from: ${moment(dateRange.startDate).format('DD MMMM YYYY ')}  to: ${moment(
                  dateRange.endDate
                ).format('DD MMMM YYYY ')}`}
                clickable
                color="primary"
                onClick={() => setOpenDateRange(true)}
              />

              <Button
                style={{ marginLeft: 40 }}
                variant="contained"
                color="primary"
                onClick={() => fetchAnyApplications(anyApplication.pageSize, anyApplication.pageSize)}
                startIcon={<Autorenew />}
              >
                {t('search')}
              </Button>
            </div>
          </div>
          <ApplicationTable
            type={'applications'}
            isLoading={isLoadingAny}
            data={{ ...anyApplication, ...state.anyApplication }}
            handleChangePage={handleChangeAnyPage}
            handleChangePageSize={handleChangeAnyPageSize}
          />
        </TabPanel>
      </Paper>
      <DatePicker
        ranges={dateRange}
        open={openDateRange}
        onClose={() => setOpenDateRange(false)}
        onChange={(e) => setDateRange(e.selection)}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (cxt: GetServerSidePropsContext<{}>) => {
  let tabValue = 0
  if (cxt.query.applications && cxt.query.applications === 'any') {
    tabValue = 1
  }
  return { props: { tabValue } }
}

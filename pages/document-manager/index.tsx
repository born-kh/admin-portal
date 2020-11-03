import React, { useState, useEffect } from 'react'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'
import { useStyles } from './styles'
import { TextField, Paper, Button, Typography, Box, Badge, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import DatePicker from '@components/common/DatePicker'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DateRangeIcon from '@material-ui/icons/DateRange'
import moment from 'moment'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MaterialTable from 'material-table'
import { useFormik } from 'formik'
import { searchTracers } from 'service/tracerManagerAPI'
import { SearchTypeParams } from '@interfaces/user-manager'
import { TracerSearchParamsType, Tracer } from '@interfaces/tracer-manager'
import TracerTable from '@components/TracerTable'
import * as Yup from 'yup'
import ApplicationTable from '@components/DocumentManager/ApplicationTable'
import * as documentManagerAPI from 'service/documentManagerAPI'
import {
  Application,
  FilterAnyApplication,
  FilterDateRange,
  FilterApplicationParams,
} from '@interfaces/document-manager'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Select from 'react-select'
import { applicationOptions, dateOptions } from '@utils/constants'
import { documentAPI } from 'service/api'
import MySelect from '@material-ui/core/Select'
import Autorenew from '@material-ui/icons/Autorenew'
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
  const [anyApplications, setAnyApplications] = useState<Application[]>([])
  const [newApplications, setNewApplications] = useState<Application[]>([])

  const [isLoadingAny, setIsLoadingAny] = useState(false)
  const [isLoadingNew, setIsLoadingNew] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState('ALL')
  const [selectedDateType, setSelectedDateType] = useState('ALL')

  const handleChange = (newValue: number) => {
    setValueTab(newValue)
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
  }, [valueTab])

  const handleFetch = () => {
    setIsLoadingAny(true)
    let filterParams: FilterApplicationParams = { start: 0, count: 100 }
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
    documentManagerAPI
      .fetchAnyApplications(filterParams)
      .then((applications) => {
        if (applications) {
          setAnyApplications(applications)
        }
        setIsLoadingAny(false)
      })
      .catch(() => {
        setIsLoadingAny(false)
      })
  }

  useEffect(() => {
    setIsLoadingAny(true)
    setIsLoadingNew(true)

    handleFetch()

    documentManagerAPI
      .fetchNewApplications()
      .then((applications) => {
        if (applications) {
          setNewApplications(applications)
        }
        setIsLoadingNew(false)
      })
      .catch(() => {
        setIsLoadingNew(false)
      })
  }, [])
  return (
    <Dashboard title={'document-manager'}>
      <Paper style={{ paddingTop: 10 }}>
        <Tabs
          value={valueTab}
          onChange={(e, newValue) => handleChange(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          {' '}
          <Tab
            label={
              <Badge badgeContent={newApplications.length} color="secondary">
                New Documents
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={anyApplications.length} color="secondary">
                Any Documents
              </Badge>
            }
          />
        </Tabs>
        <TabPanel value={valueTab} index={0}>
          <ApplicationTable type={'new applications'} isLoading={isLoadingNew} data={newApplications} />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <div className={classes.paper}>
            <div>
              <FormControl variant="outlined" className={classes.formControl} style={{ margin: '20px 5px' }}>
                <InputLabel id="application">Set Application Status</InputLabel>

                <MySelect
                  labelId="application"
                  id="application"
                  name="application"
                  value={selectedApplication}
                  onChange={(e: React.ChangeEvent<any>) => setSelectedApplication(e.target.value)}
                  label="Set Application Status"
                >
                  {applicationOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </MySelect>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl} style={{ margin: '20px 5px' }}>
                <InputLabel id="SetTypeDate">Set Type Date</InputLabel>

                <MySelect
                  labelId="SetTypeDate"
                  id="SetTypeDate"
                  name="SetTypeDate"
                  value={selectedDateType}
                  onChange={(e: React.ChangeEvent<any>) => setSelectedDateType(e.target.value)}
                  label="Set Type Date"
                >
                  {dateOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </MySelect>
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
                onClick={handleFetch}
                startIcon={<Autorenew />}
              >
                Search
              </Button>
            </div>
          </div>
          <ApplicationTable type={'applications'} isLoading={isLoadingAny} data={anyApplications} />
        </TabPanel>
      </Paper>
      <DatePicker
        ranges={dateRange}
        open={openDateRange}
        onClose={() => setOpenDateRange(false)}
        onChange={(e) => setDateRange(e.selection)}
      />
    </Dashboard>
  )
}
function TabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (cxt: GetServerSidePropsContext<{}>) => {
  let tabValue = 0
  if (cxt.query.applications && cxt.query.applications === 'any') {
    tabValue = 1
  }
  return { props: { tabValue } }
}

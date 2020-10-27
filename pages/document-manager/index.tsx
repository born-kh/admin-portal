import React, { useState, useEffect } from 'react'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'
import { useStyles } from './styles'
import { TextField, Paper, Button, Typography, Box, Badge, FormControl, InputLabel } from '@material-ui/core'
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
import { Application } from '@interfaces/document-manager'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Select from 'react-select'
import { applicationOptions, dateOptions } from '@utils/constants'
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
  const [errors, setErrors] = useState<Tracer[]>([])
  const [isLoadingAny, setIsLoadingAny] = useState(false)
  const [isLoadingNew, setIsLoadingNew] = useState(false)
  const [selectedOption, setSelectedOption] = useState({ value: 'ALL', label: 'ALL' })
  const [selectedDateOption, setSelectedDateOption] = useState({ value: 'ALL', label: 'ALL' })

  const handleChange = (newValue: number) => {
    setValueTab(newValue)
  }

  //   const formik = useFormik({
  //     initialValues: {
  //       search: '',
  //     },
  //     validationSchema: Yup.object().shape({
  //       search: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  //     }),
  //     onSubmit: (values) => {
  //       setIsLoading(true)
  //       const params: TracerSearchParamsType = {
  //         search: values.search,
  //         fromTS: dateRange.startDate.toISOString().split('.')[0] + 'Z',
  //         toTS: dateRange.endDate.toISOString().split('.')[0] + 'Z',
  //       }
  //       console.log(params)
  //       searchTracers(params)
  //         .then((response) => {
  //           if (response) {
  //             setMessages(response.messages)
  //             setErrors(response.errors)
  //           }

  //           setIsLoading(false)
  //         })
  //         .catch(() => {
  //           setIsLoading(false)
  //         })
  //     },
  //   })
  //   const searchError = formik.errors.search !== undefined && formik.touched.search
  useEffect(() => {
    if (valueTab === 0) {
      router.push({
        pathname: '/document-manager',
        query: { applications: 'any' },
      })
    } else if (valueTab === 1) {
      router.push({
        pathname: '/document-manager',
        query: { applications: 'new' },
      })
    }
  }, [valueTab])

  useEffect(() => {
    setIsLoadingAny(true)
    setIsLoadingNew(true)
    documentManagerAPI
      .fetchAnyApplications()
      .then((applications) => {
        if (applications) {
          setAnyApplications(applications)
        }
        setIsLoadingAny(false)
      })
      .catch(() => {
        setIsLoadingAny(false)
      })

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
          <Tab
            label={
              <Badge badgeContent={anyApplications.length} color="secondary">
                Any Documents
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={newApplications.length} color="secondary">
                New Documents
              </Badge>
            }
          />
        </Tabs>
        <TabPanel value={valueTab} index={0}>
          <div className={classes.paper}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel> Application</InputLabel>

              <Select options={applicationOptions} onChange={(val) => setSelectedOption(val)} value={selectedOption} />
            </FormControl>

            <Select options={dateOptions} onChange={(val) => setSelectedOption(val)} value={selectedDateOption} />
            <Chip
              variant="outlined"
              size="medium"
              icon={<DateRangeIcon />}
              label={`from: ${moment(dateRange.startDate).format('DD MMMM YYYY ')}  to: ${moment(
                dateRange.endDate
              ).format('DD MMMM YYYY ')}`}
              clickable
              color="primary"
              onClick={() => setOpenDateRange(true)}
            />
          </div>
          <ApplicationTable type={'applications'} isLoading={isLoadingAny} data={anyApplications} />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <ApplicationTable type={'new applications'} isLoading={isLoadingNew} data={newApplications} />
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
  if (cxt.query.applications && cxt.query.applications === 'new') {
    tabValue = 1
  }
  return { props: { tabValue } }
}

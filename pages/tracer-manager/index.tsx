import React, { useState } from 'react'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'
import { useStyles } from './styles'
import { TextField, Paper, Button, Typography, Box, Badge } from '@material-ui/core'
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

export default function () {
  const classes = useStyles()
  const [openDateRange, setOpenDateRange] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const [value, setValue] = React.useState(0)
  const [messages, setMessages] = useState<Tracer[]>([])
  const [errors, setErrors] = useState<Tracer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: Yup.object().shape({
      search: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    }),
    onSubmit: (values) => {
      setIsLoading(true)
      const params: TracerSearchParamsType = {
        search: values.search,
        fromTS: dateRange.startDate.toISOString().split('.')[0] + 'Z',
        toTS: dateRange.endDate.toISOString().split('.')[0] + 'Z',
      }

      searchTracers(params)
        .then((result) => {
          setMessages(result.messages)
          setErrors(result.errors)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    },
  })
  const searchError = formik.errors.search !== undefined && formik.touched.search
  return (
    <Dashboard title={'tracer-manager'}>
      <Paper className={classes.paper}>
        <Title>Search Tracer</Title>
        <form noValidate onSubmit={formik.handleSubmit}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="search"
            label="Search Tracer"
            name="search"
            className={classes.textField}
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.search}
            error={searchError}
            helperText={searchError ? formik.errors.search : null}
          />

          <Button variant="contained" className={classes.button} color="primary" type="submit">
            Search
          </Button>
        </form>
      </Paper>
      <Paper style={{ paddingTop: 10 }}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab
            label={
              <Badge badgeContent={messages.length} color="secondary">
                Tracer Messages
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={errors.length} color="secondary">
                Tracer Errors
              </Badge>
            }
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TracerTable type={'messages'} isLoading={isLoading} data={messages} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TracerTable type={'errors'} isLoading={isLoading} data={errors} />
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

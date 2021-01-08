import React, { useState } from 'react'
//material ui components
import { TextField, Paper, Button, Typography, Box, Badge, Tabs, Tab, Chip } from '@material-ui/core'
//custom components
import DatePicker from '@components/common/DatePicker'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'
import TabPanel from '@components/common/TabPanel'
import TracerTable from '@components/TracerTable'
//material ui icons
import DateRangeIcon from '@material-ui/icons/DateRange'
//moment js
import moment from 'moment'
//tracer-manager REST APIS
import { searchTracers } from 'service/tracerManagerAPI'
import { TracerSearchParamsType, Tracer } from '@interfaces/tracer-manager'
//useFormik hook
import { useFormik } from 'formik'
//Yup lib for validation
import * as Yup from 'yup'
//styles

import useTranslation from 'hooks/useTranslation'
import { useStylesTracerManager } from 'styles/tracer-manager-styles'

/* Tracer Manager Component */
export default function Tracermanager() {
  const classes = useStylesTracerManager()
  const [openDateRange, setOpenDateRange] = useState(false)
  var startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)
  const [dateRange, setDateRange] = useState(() => {
    return {
      startDate,
      endDate: new Date(),
      key: 'selection',
    }
  })
  const [value, setValue] = useState(0)
  const [messages, setMessages] = useState<Tracer[]>([])
  const [errors, setErrors] = useState<Tracer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { t, locale } = useTranslation()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  moment.locale(locale)

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

  console.log(formik.errors, formik.touched)
  const searchError = formik.errors.search !== undefined && formik.touched.search
  return (
    <>
      <Paper className={classes.paper}>
        <Title>{t('searchTracer')}</Title>
        <form noValidate onSubmit={formik.handleSubmit}>
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
            fullWidth
            id="search"
            label={t('searchTracer')}
            name="search"
            className={classes.textField}
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.search}
            error={searchError}
            helperText={searchError ? formik.errors.search : null}
          />

          <Button variant="contained" className={classes.button} color="primary" type="submit">
            {t('search')}
          </Button>
        </form>
      </Paper>
      <Paper style={{ paddingTop: 10 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          style={{ borderBottom: '1px solid #e8e8e8' }}
        >
          <Tab
            label={
              <Badge badgeContent={messages.length} color="secondary">
                {t('tracerMessages')}
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={errors.length} color="secondary">
                {t('tracerErrors')}
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
    </>
  )
}

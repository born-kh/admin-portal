import React, { useState, useEffect } from 'react'
//material ui components
import {
  TextField,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  FormControl,
  Select,
  MenuItem,
  Button,
  createMuiTheme,
  MuiThemeProvider,
  Checkbox,
  Chip,
  TablePagination,
  FormLabel,
  TableHead,
} from '@material-ui/core'
//moment js
import moment from 'moment'
//useFormik hook
import { useFormik } from 'formik'
//Yup lib for validation
import * as Yup from 'yup'
//styles
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SearchIcon from '@material-ui/icons/Search'
import useTranslation from 'hooks/useTranslation'
import { statisticsAPI } from 'service/api'
import MaterialTable from 'material-table'
import {
  Call,
  CallType,
  EndpointState,
  CallState,
  FilterCallDetailRecordsParams,
  FilterTextType,
  FilterType,
  FiltertText,
} from '@interfaces/statistics'

import DatePicker from '@components/common/DatePicker'
import dynamic from 'next/dynamic'

import DateRangeIcon from '@material-ui/icons/DateRange'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        paddingTop: 4,
        paddingBottom: 4,
        '&:last-child': {
          paddingRight: 5,
        },
        fontSize: 12,
        borderBottom: 'none',
      },
    },

    MuiTableRow: {
      root: {
        borderBottom: '1px solid rgba(224, 224, 224, 1);',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: 12,
        padding: 0,
      },
    },
    MuiTypography: {
      body1: {
        fontSize: 12,
      },
    },
  },
})
/* Tracer Manager Component */
export default function UserLogs() {
  const [callData, setCallData] = useState<{
    items: Call[]
    totalCount: number
  }>({ items: [], totalCount: 0 })

  const [isLoading, setIsLoading] = useState(false)
  const [openDateRange, setOpenDateRange] = useState(false)
  const { t, locale } = useTranslation()
  var startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)
  const [dateRange, setDateRange] = useState(() => {
    return {
      startDate,
      endDate: new Date(),
      key: 'selection',
    }
  })
  const [withDateRange, setWithDateRange] = useState(false)

  const formik = useFormik({
    initialValues: {
      originationNumber: '',
      originationNumberType: FilterTextType.EXACT,
      originationNumberFilterType: FilterType.or,
      destinationNumber: '',
      destinationNumberType: FilterTextType.EXACT,
      destinationNumberFilterType: FilterType.or,
      callID: '',
      callIDType: FilterTextType.EXACT,
      callIDFilterType: FilterType.or,
      callState: CallState.all,
      callType: CallType.ALL,
      endpointState: EndpointState.ALL,
      limit: 10,
      page: 1,
    },
    validationSchema: Yup.object().shape({
      originationNumber: Yup.string().min(3, 'Too Short!').max(13, 'Too Long!'),
      destinationNumber: Yup.string().min(3, 'Too Short!').max(13, 'Too Long!'),
      callID: Yup.string().min(3, 'Too Short!').max(13, 'Too Long!'),
    }),

    onSubmit: (values) => {
      handleOnSubmit()
    },
  })

  const handleChangePage = (page: number) => {
    formik.setValues({ ...formik.values, page })
  }
  const handleChangePageSize = (limit: number) => {
    formik.setValues({ ...formik.values, limit })
  }
  moment.locale(locale)

  const handleOnChangeFilterTextType = (name: string, type: FilterTextType) => {
    formik.setValues({
      ...formik.values,
      [name]: type,
    })
  }

  const handleOnChangeFilterType = (name: string, filterType: FilterType) => {
    formik.setValues({
      ...formik.values,
      [name]: filterType,
    })
  }

  useEffect(() => {
    handleOnSubmit()
  }, [formik.values.limit, formik.values.page])

  const handleOnSubmit = () => {
    if (!formik.errors.originationNumber && !formik.errors.destinationNumber && !formik.errors.callID) {
      let params: FilterCallDetailRecordsParams = {
        page: formik.values.page,
        limit: formik.values.limit,
        filter: {},
      }

      if (withDateRange) {
        params.filter.range = {
          from: dateRange.startDate.toISOString().split('.')[0] + 'Z',
          to: dateRange.endDate.toISOString().split('.')[0] + 'Z',
        }
      }

      if (formik.values.callID.trim().length > 0) {
        params.filter.callID = {
          text: formik.values.callID,
          type: formik.values.callIDType,
          filterType: formik.values.callIDFilterType,
        }
      }
      if (formik.values.originationNumber.trim().length > 0) {
        params.filter.originationNumber = {
          text: formik.values.originationNumber,
          type: formik.values.originationNumberType,
          filterType: formik.values.originationNumberFilterType,
        }
      }
      if (formik.values.destinationNumber.trim().length > 0) {
        params.filter.destinationNumber = {
          text: formik.values.destinationNumber,
          type: formik.values.destinationNumberType,
          filterType: formik.values.destinationNumberFilterType,
        }
      }

      if (formik.values.callType !== CallType.ALL) {
        params.filter.callType = formik.values.callType
      }
      if (formik.values.callState !== CallState.all) {
        params.filter.callState = formik.values.callState
      }
      if (formik.values.endpointState !== EndpointState.ALL) {
        params.filter.endpointState = formik.values.endpointState
      }

      setIsLoading(true)
      statisticsAPI
        .callGetAll(params)
        .then((response) => {
          if (response.status === 200) {
            setCallData({ items: response.data.items, totalCount: response.data.metadata.total })
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <form onSubmit={formik.handleSubmit}>
        <TableContainer component={Paper} style={{ marginBottom: 20 }}>
          <Table aria-label="simple table" style={{ padding: 10 }}>
            <TableBody>
              <TableRow>
                <TableCell align="left" width={150}>
                  Date
                </TableCell>

                <TableCell align="left">
                  <Checkbox
                    checked={withDateRange}
                    color="primary"
                    onChange={() => setWithDateRange(!withDateRange)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Chip
                    variant="outlined"
                    size="medium"
                    icon={<DateRangeIcon />}
                    label={`${t('from')}: ${moment(dateRange.startDate).format('DD MMMM YYYY HH:mm')}   ${t(
                      'to'
                    )}: ${moment(dateRange.endDate).format('DD MMMM YYYY HH:mm')}`}
                    clickable
                    color="primary"
                    onClick={() => setOpenDateRange(true)}
                  />
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Origination Number
                </TableCell>
                <TableCell align="left">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    value={formik.values.originationNumber}
                    name="originationNumber"
                    onChange={formik.handleChange}
                    size="small"
                    fullWidth
                    style={{ margin: 0, width: 220 }}
                    error={!!formik.errors.originationNumber && !!formik.touched.originationNumber}
                    helperText={
                      formik.errors.originationNumber && formik.touched.originationNumber
                        ? formik.errors.originationNumber
                        : null
                    }
                  />
                  <FormControlLabel
                    control={
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        row
                        style={{ marginLeft: 10 }}
                      >
                        <FormControlLabel
                          value="start"
                          checked={formik.values.originationNumberFilterType === FilterType.or}
                          control={<Radio size="small" color="primary" />}
                          onChange={() => handleOnChangeFilterType('originationNumberFilterType', FilterType.or)}
                          label="or"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.originationNumberFilterType === FilterType.and}
                          onChange={() => handleOnChangeFilterType('originationNumberFilterType', FilterType.and)}
                          control={<Radio size="small" color="primary" />}
                          label="and"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    }
                    label="type:"
                    labelPlacement="start"
                  />
                </TableCell>

                <TableCell align="right" style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlLabel
                    control={
                      <RadioGroup row aria-label="position" name="position" style={{ marginLeft: 10 }}>
                        <FormControlLabel
                          value="start"
                          checked={formik.values.originationNumberType === FilterTextType.EXACT}
                          control={<Radio size="small" color="primary" />}
                          onChange={() => handleOnChangeFilterTextType('originationNumberType', FilterTextType.EXACT)}
                          label="Exact"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.originationNumberType === FilterTextType.BEGINS_WITH}
                          onChange={() =>
                            handleOnChangeFilterTextType('originationNumberType ', FilterTextType.BEGINS_WITH)
                          }
                          control={<Radio size="small" color="primary" />}
                          label="Begins With"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.originationNumberType === FilterTextType.CONTAINS}
                          onChange={() =>
                            handleOnChangeFilterTextType('originationNumberType ', FilterTextType.CONTAINS)
                          }
                          control={<Radio size="small" color="primary" />}
                          label="Contains"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.originationNumberType === FilterTextType.ENDS_WITH}
                          onChange={() =>
                            handleOnChangeFilterTextType('originationNumberType ', FilterTextType.ENDS_WITH)
                          }
                          control={<Radio size="small" color="primary" />}
                          label="Ends With"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    }
                    label="text type:"
                    labelPlacement="start"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left" width={150}>
                  Destination Number
                </TableCell>
                <TableCell align="left">
                  <TextField
                    value={formik.values.destinationNumber}
                    name="destinationNumber"
                    onChange={formik.handleChange}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    style={{ width: 220, margin: 0 }}
                    error={!!formik.errors.destinationNumber && !!formik.touched.destinationNumber}
                    helperText={
                      formik.errors.destinationNumber && formik.touched.destinationNumber
                        ? formik.errors.destinationNumber
                        : null
                    }
                  />

                  <FormControlLabel
                    control={
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        row
                        style={{ marginLeft: 10 }}
                      >
                        <FormControlLabel
                          value="start"
                          checked={formik.values.destinationNumberFilterType === FilterType.or}
                          control={<Radio size="small" color="primary" />}
                          onChange={() => handleOnChangeFilterType('destinationNumberFilterType', FilterType.or)}
                          label="or"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.destinationNumberFilterType === FilterType.and}
                          onChange={() => handleOnChangeFilterType('destinationNumberFilterType', FilterType.and)}
                          control={<Radio size="small" color="primary" />}
                          label="and"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    }
                    label="type:"
                    labelPlacement="start"
                  />
                </TableCell>

                <TableCell align="left">
                  <FormControlLabel
                    control={
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        style={{ marginLeft: 10 }}
                      >
                        <FormControlLabel
                          value="start"
                          checked={formik.values.destinationNumberType === FilterTextType.EXACT}
                          onChange={() => handleOnChangeFilterTextType('destinationNumberType', FilterTextType.EXACT)}
                          control={<Radio size="small" color="primary" />}
                          label="Exact"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.destinationNumberType === FilterTextType.BEGINS_WITH}
                          onChange={() =>
                            handleOnChangeFilterTextType('destinationNumberType', FilterTextType.BEGINS_WITH)
                          }
                          control={<Radio size="small" color="primary" />}
                          label="Begins With"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.destinationNumberType === FilterTextType.CONTAINS}
                          onChange={() =>
                            handleOnChangeFilterTextType('destinationNumberType', FilterTextType.CONTAINS)
                          }
                          control={<Radio size="small" color="primary" />}
                          label="Contains"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.destinationNumberType === FilterTextType.ENDS_WITH}
                          onChange={() =>
                            handleOnChangeFilterTextType('destinationNumberType', FilterTextType.ENDS_WITH)
                          }
                          control={<Radio size="small" color="primary" />}
                          label="Ends With"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    }
                    label="text type:"
                    labelPlacement="start"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Call ID
                </TableCell>
                <TableCell align="left">
                  <TextField
                    value={formik.values.callID}
                    name="callID"
                    onChange={formik.handleChange}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    style={{ width: 220, margin: 0 }}
                  />

                  <FormControlLabel
                    control={
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        row
                        style={{ marginLeft: 10 }}
                      >
                        <FormControlLabel
                          value="start"
                          checked={formik.values.callIDFilterType === FilterType.or}
                          control={<Radio size="small" color="primary" />}
                          onChange={() => handleOnChangeFilterType('callIDFilterType', FilterType.or)}
                          label="or"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.callIDFilterType === FilterType.and}
                          onChange={() => handleOnChangeFilterType('callIDFilterType', FilterType.and)}
                          control={<Radio size="small" color="primary" />}
                          label="and"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    }
                    label="type:"
                    labelPlacement="start"
                  />
                </TableCell>

                <TableCell align="left">
                  <FormControlLabel
                    control={
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        style={{ marginLeft: 10 }}
                      >
                        <FormControlLabel
                          value="start"
                          checked={formik.values.callIDType === FilterTextType.EXACT}
                          onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextType.EXACT)}
                          control={<Radio size="small" color="primary" />}
                          label="Exact"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.callIDType === FilterTextType.BEGINS_WITH}
                          onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextType.BEGINS_WITH)}
                          control={<Radio size="small" color="primary" />}
                          label="Begins With"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.callIDType === FilterTextType.CONTAINS}
                          onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextType.CONTAINS)}
                          control={<Radio size="small" color="primary" />}
                          label="Contains"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="start"
                          checked={formik.values.callIDType === FilterTextType.ENDS_WITH}
                          onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextType.ENDS_WITH)}
                          control={<Radio size="small" color="primary" />}
                          label="Ends With"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    }
                    label="text type:"
                    labelPlacement="start"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left" width={150}>
                  Options
                </TableCell>
                <TableCell align="left">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <FormControlLabel
                      control={
                        <FormControl variant="outlined" size="small">
                          <Select
                            style={{ width: 220, margin: '0px 0px 0px 40px' }}
                            value={formik.values.callType}
                            name="callType"
                            onChange={formik.handleChange}
                          >
                            {Object.values(CallType).map((value: string) => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                      label="Call Type:"
                      labelPlacement="start"
                      style={{ marginBottom: 5 }}
                    />

                    <FormControlLabel
                      control={
                        <FormControl variant="outlined" size="small">
                          <Select
                            style={{ width: 220, margin: '0px 0px 0px 10px' }}
                            value={formik.values.endpointState}
                            name="endpointState"
                            onChange={formik.handleChange}
                          >
                            {Object.values(EndpointState).map((value: string) => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                      label="Endpoint State:"
                      style={{ marginBottom: 5 }}
                      labelPlacement="start"
                    />

                    <FormControlLabel
                      control={
                        <FormControl variant="outlined" size="small">
                          <Select
                            style={{ width: 220, margin: '0px 0px 0px 38px' }}
                            value={formik.values.callState}
                            name="callState"
                            onChange={formik.handleChange}
                          >
                            {Object.values(CallState).map((value: string) => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                      label="Call State:"
                      style={{ marginBottom: 5 }}
                      labelPlacement="start"
                    />

                    <FormControlLabel
                      control={
                        <FormControl variant="outlined" size="small" style={{ display: 'flex', flexDirection: 'row' }}>
                          <FormControlLabel
                            value="start"
                            control={<Radio size="small" color="primary" />}
                            label="mins"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="start"
                            control={<Radio size="small" color="primary" />}
                            label="secs"
                            labelPlacement="start"
                          />
                        </FormControl>
                      }
                      label="Result:"
                      labelPlacement="start"
                    />
                  </div>
                </TableCell>

                <TableCell align="center">
                  {' '}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    startIcon={<SearchIcon />}
                    // onClick={handleOnSubmit}
                  >
                    {t('search')}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <MaterialTable
          title={'Call Logs'}
          isLoading={isLoading}
          localization={{ body: { emptyDataSourceMessage: '' } }}
          columns={[
            { title: 'Call ID', field: 'id' },
            {
              title: 'Origination Number',
              field: '',
              render: (rowData) => (rowData && rowData.originationNumber) || '-',
              width: 150,
              align: 'center',
            },
            {
              title: 'Destination Number',
              field: '',
              render: (rowData) => (rowData && rowData.destinationNumber) || '-',
              width: 150,
              align: 'center',
            },
            { title: 'Call Type', field: 'type', width: 150 },
            { title: 'Call State', field: 'callState', width: 150 },
            { title: 'Duration', field: '', render: (rowData) => rowData && rowData.connectedAt && 0 },
            { title: 'Account ID', field: 'accountID' },
            { title: 'Connected At', field: 'connectedAt' },
          ]}
          data={callData.items}
          options={{
            sorting: false,
            pageSize: formik.values.limit,
          }}
          components={{
            Pagination: (props) => {
              return (
                <TablePagination
                  {...props}
                  rowsPerPage={formik.values.limit}
                  count={callData.totalCount}
                  page={formik.values.page}
                  onChangePage={(e, page) => handleChangePage(page)}
                />
              )
            },
          }}
          onChangeRowsPerPage={(pageSize) => {
            handleChangePageSize(pageSize)
          }}
          style={{ fontSize: 12 }}
          detailPanel={[
            {
              tooltip: t('showDetail'),

              render: (d) => {
                return (
                  d && (
                    <Table aria-label="simple table" style={{ padding: 10, marginLeft: 20 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>participantState</TableCell>
                          <TableCell>direction</TableCell>
                          <TableCell>lastActiveces</TableCell>
                          <TableCell>audio</TableCell>
                          <TableCell>video</TableCell>
                          <TableCell>screen</TableCell>
                          <TableCell>role</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow>
                          <TableCell>{d.participantState && d.lastActives.map((text) => <p>{text}</p>)}</TableCell>
                          <TableCell>{d.lastActives && d.lastActives.map((text) => <p>{text}</p>)}</TableCell>
                          <TableCell>{d.direction && d.direction.map((text) => <p>{text}</p>)}</TableCell>
                          <TableCell>{d.audio && d.audio.map((text) => <p>{text}</p>)}</TableCell>
                          <TableCell>{d.video && d.video.map((text) => <p>{text}</p>)}</TableCell>
                          <TableCell>{d.screen && d.screen.map((text) => <p>{text}</p>)}</TableCell>
                          <TableCell>{d.role && d.role.map((text) => <p>{text}</p>)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  )
                )
              },
            },
          ]}
        />
      </form>

      <DatePicker
        ranges={dateRange}
        open={openDateRange}
        onClose={() => setOpenDateRange(false)}
        onChange={(e) => setDateRange(e.selection)}
      />
    </MuiThemeProvider>
  )
}

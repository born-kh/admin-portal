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
} from '@material-ui/core'
//moment js
import moment from 'moment'
//useFormik hook
import { useFormik } from 'formik'

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
} from '@interfaces/statistics'

import DatePicker from '@components/common/DatePicker'

import DateRangeIcon from '@material-ui/icons/DateRange'

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

  const formik = useFormik({
    initialValues: {
      filter: {
        originationNumber: {
          text: '',
          type: FilterTextType.EXACT,
          filterType: FilterType.or,
        },
        destinationNumber: {
          text: '',
          type: FilterTextType.EXACT,
          filterType: FilterType.or,
        },
        callID: {
          text: '',
          type: FilterTextType.EXACT,
          filterType: FilterType.or,
        },
        range: {
          from: moment().format(),
          to: moment().format(),
        },
        callState: CallState.all,
        callType: CallType.ALL,
      },
      limit: 10,
      page: 1,
    } as FilterCallDetailRecordsParams,

    onSubmit: (values) => {},
  })

  const handleChangePage = (page: number) => {
    formik.setValues({ ...formik.values, page })
  }
  const handleChangePageSize = (limit: number) => {
    formik.setValues({ ...formik.values, limit })
  }
  moment.locale(locale)
  // useEffect(() => {
  //   setIsLoading(true)
  //   statisticsAPI
  //     .callGetAll()
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setCalls(response.data.calls)
  //       }
  //       setIsLoading(false)
  //     })
  //     .catch((e) => {
  //       setIsLoading(false)
  //     })
  // }, [])

  const handleOnChangeFilterTextType = (name: string, type: FilterTextType) => {
    formik.setValues({
      ...formik.values,
      filter: {
        ...formik.values.filter,
        [name]: {
          ...formik.values.filter.[name],
          type,
        },
      },
    })
  }

  useEffect(() => {
    handleOnSubmit()
  }, [formik.values.limit, formik.values.page])
  const handleOnSubmit = () => {
    let params: FilterCallDetailRecordsParams = {
      page: formik.values.page,
      limit: formik.values.limit,
      filter: {
        range: {
          from: dateRange.startDate.toISOString().split('.')[0] + 'Z',
          to: dateRange.endDate.toISOString().split('.')[0] + 'Z',
        },
      },
    }

    if (formik.values.filter.callID && formik.values.filter.callID?.text.trim().length > 0) {
      params.filter.callID = formik.values.filter.callID
    }
    if (formik.values.filter.originationNumber && formik.values.filter.originationNumber?.text.trim().length > 0) {
      params.filter.originationNumber = formik.values.filter.originationNumber
    }
    if (formik.values.filter.destinationNumber && formik.values.filter.destinationNumber?.text.trim().length > 0) {
      params.filter.destinationNumber = formik.values.filter.destinationNumber
    }

    if (formik.values.filter.callType !== CallType.ALL) {
      params.filter.callType = formik.values.filter.callType
    }
    if (formik.values.filter.callState !== CallState.all) {
      params.filter.callState = formik.values.filter.callState
    }

    console.log(params)
    setIsLoading(true)
    statisticsAPI
      .callGetAll(params)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setCallData({ items: response.data.items, totalCount: response.data.metadata.total })
        }
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
      })
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <TableContainer component={Paper} style={{ marginBottom: 20 }}>
          <Table aria-label="simple table" style={{ padding: 10 }}>
            <TableBody>
              <TableRow>
                <TableCell align="left" width={150}>
                  Customers
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Date
                </TableCell>

                <TableCell align="left">
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
                    value={formik.values.filter?.originationNumber?.text}
                    name="filter.originationNumber.text"
                    onChange={formik.handleChange}
                    required
                    size="small"
                    style={{ width: 300, margin: 0 }}
                  />
                </TableCell>

                <TableCell align="right">
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.originationNumber?.type === FilterTextType.EXACT}
                      control={<Radio size="small" color="primary" />}
                      onChange={() => handleOnChangeFilterTextType('originationNumber', FilterTextType.EXACT)}
                      label="Exact"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.originationNumber?.type === FilterTextType.BEGINS_WITH}
                      onChange={() => handleOnChangeFilterTextType('originationNumber', FilterTextType.BEGINS_WITH)}
                      control={<Radio size="small" color="primary" />}
                      label="Begins With"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.originationNumber?.type === FilterTextType.CONTAINS}
                      onChange={() => handleOnChangeFilterTextType('originationNumber', FilterTextType.CONTAINS)}
                      control={<Radio size="small" color="primary" />}
                      label="Contains"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.originationNumber?.type === FilterTextType.ENDS_WITH}
                      onChange={() => handleOnChangeFilterTextType('originationNumber', FilterTextType.ENDS_WITH)}
                      control={<Radio size="small" color="primary" />}
                      label="Ends With"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Destination Number
                </TableCell>
                <TableCell align="left">
                  <TextField
                    value={formik.values.filter?.destinationNumber?.text}
                    name="filter.destination.text"
                    onChange={formik.handleChange}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    style={{ width: 300, margin: 0 }}
                  />
                </TableCell>

                <TableCell align="right">
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.destinationNumber?.type === FilterTextType.EXACT}
                      onChange={() => handleOnChangeFilterTextType('destinationNumber', FilterTextType.EXACT)}
                      control={<Radio size="small" color="primary" />}
                      label="Exact"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.destinationNumber?.type === FilterTextType.BEGINS_WITH}
                      onChange={() => handleOnChangeFilterTextType('destinationNumber', FilterTextType.BEGINS_WITH)}
                      control={<Radio size="small" color="primary" />}
                      label="Begins With"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.destinationNumber?.type === FilterTextType.CONTAINS}
                      onChange={() => handleOnChangeFilterTextType('destinationNumber', FilterTextType.CONTAINS)}
                      control={<Radio size="small" color="primary" />}
                      label="Contains"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.destinationNumber?.type === FilterTextType.ENDS_WITH}
                      onChange={() => handleOnChangeFilterTextType('destinationNumber', FilterTextType.ENDS_WITH)}
                      control={<Radio size="small" color="primary" />}
                      label="Ends With"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Call ID
                </TableCell>
                <TableCell align="left">
                  <TextField
                    value={formik.values.filter?.callID?.text}
                    name="filter.callID.text"
                    onChange={formik.handleChange}
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    style={{ width: 300, margin: 0 }}
                  />
                </TableCell>

                <TableCell align="right">
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.callID?.type === FilterTextType.EXACT}
                      onChange={() => handleOnChangeFilterTextType('callID', FilterTextType.EXACT)}
                      control={<Radio size="small" color="primary" />}
                      label="Exact"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.callID?.type === FilterTextType.BEGINS_WITH}
                      onChange={() => handleOnChangeFilterTextType('callID', FilterTextType.BEGINS_WITH)}
                      control={<Radio size="small" color="primary" />}
                      label="Begins With"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.callID?.type === FilterTextType.CONTAINS}
                      onChange={() => handleOnChangeFilterTextType('callID', FilterTextType.CONTAINS)}
                      control={<Radio size="small" color="primary" />}
                      label="Contains"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      checked={formik.values.filter?.callID?.type === FilterTextType.ENDS_WITH}
                      onChange={() => handleOnChangeFilterTextType('callID', FilterTextType.ENDS_WITH)}
                      control={<Radio size="small" color="primary" />}
                      label="Ends With"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Call type
                </TableCell>
                <TableCell align="left">
                  <FormControl variant="outlined" size="small">
                    <Select
                      style={{ width: 300, margin: 0 }}
                      value={formik.values.filter?.callType}
                      name="filter.callType"
                      onChange={formik.handleChange}
                    >
                      {Object.keys(CallType).map((key: string) => (
                        <MenuItem key={CallType[key]} value={CallType[key]}>
                          {CallType[key]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="left"></TableCell>
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
                            style={{ width: 220, margin: '0px 0px 0px 10px' }}
                            value={formik.values.filter?.endpointState}
                            name="filter.endpointState"
                            onChange={formik.handleChange}
                          >
                            {Object.keys(EndpointState).map((key: string) => (
                              <MenuItem key={EndpointState[key]} value={EndpointState[key]}>
                                {EndpointState[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                      label="Show Calls:"
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
                    startIcon={<SearchIcon />}
                    onClick={handleOnSubmit}
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
            { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 50  },
            { title: 'Call ID', field: 'id' },
            { title: 'Origination Number', field: '', render: (rowData) => rowData && rowData.originationNumber|| "-" ,width: 150, align:'center'},
            { title: 'Destination Number', field: '', render: (rowData) => rowData && rowData.destinationNumber|| "-", width: 150, align:'center'},
            { title: 'Call Type', field: 'type',  width: 150 },
            { title: 'Call State', field: 'callState', width: 150  },
          { title: 'Duration',  field: '', render: (rowData) => rowData &&rowData.connectedAt && 0},
            { title: 'Account ID', field: 'accountID' },
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
          style={{fontSize: 12,}}
        />
      </div>

      <DatePicker
        ranges={dateRange}
        open={openDateRange}
        onClose={() => setOpenDateRange(false)}
        onChange={(e) => setDateRange(e.selection)}
      />
    </MuiThemeProvider>
  )
}

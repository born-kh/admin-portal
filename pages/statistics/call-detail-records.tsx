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
  Grid,
  colors,
  Card,
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
import MaterialTable from 'material-table'

import DatePicker from '@components/common/DatePicker'
import dynamic from 'next/dynamic'

import DateRangeIcon from '@material-ui/icons/DateRange'
import { useRouter } from 'next/router'
import { HorizontalBar } from 'react-chartjs-2'

import {
  ICall,
  ICountStarts,
  FilterTextTypeCDR,
  FilterTypeCDR,
  EndpointState,
  CallType,
  CallState,
  StatisticsManagerModel,
} from '@Interfaces'
import { ServiceStatisticsManager } from '@Services/API/StatisticsManager'

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
export default function CDRStatistics() {
  const [callData, setCallData] = useState<{
    items: ICall[]
    totalCount: number
  }>({ items: [], totalCount: 0 })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingStars, setIsLoadingStars] = useState(false)
  const [countStars, setCountStars] = useState<ICountStarts>({})
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

  const router = useRouter()
  const [withDateRange, setWithDateRange] = useState(false)
  const dataHorBar = {
    labels: ['5', '4', '3', '2', '1'],
    datasets: [
      {
        label: 'Call Stars',
        backgroundColor: ['#57bb8a', '#9ace6a', '#ffcf02', '#ff9f02', '#ff6f31'],
        borderWidth: 1,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
        data: [65, 59, 80, 81, 100],
      },
    ],
  }

  const formik = useFormik({
    initialValues: {
      originationNumber: '',
      originationNumberType: FilterTextTypeCDR.EXACT,
      originationNumberFilterType: FilterTypeCDR.or,
      destinationNumber: '',
      destinationNumberType: FilterTextTypeCDR.EXACT,
      destinationNumberFilterType: FilterTypeCDR.or,
      callID: '',
      callIDType: FilterTextTypeCDR.EXACT,
      callIDFilterType: FilterTypeCDR.or,
      callState: CallState.all,
      callType: CallType.ALL,
      endpointState: EndpointState.ALL,
      limit: 10,
      page: 0,
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
    formik.setValues({ ...formik.values, page: 0, limit })
  }
  moment.locale(locale)

  const handleOnChangeFilterTextType = (name: string, type: FilterTextTypeCDR) => {
    formik.setValues({
      ...formik.values,
      [name]: type,
    })
  }

  const handleOnChangeFilterType = (name: string, filterType: FilterTypeCDR) => {
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
      let params: StatisticsManagerModel.CDRCallGet.Params = {
        page: formik.values.page + 1,
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
      ServiceStatisticsManager.cdrCallGet(params)
        .then((res) => {
          if (res.result) {
            setCallData({ items: res.result.items, totalCount: res.result.metadata.total })
          }
          setIsLoading(false)
        })
        .catch((e) => {
          setIsLoading(false)
        })
      setIsLoadingStars(true)
      ServiceStatisticsManager.cdrGetStars({
        from: dateRange.startDate.toISOString().split('.')[0] + 'Z',
        to: dateRange.endDate.toISOString().split('.')[0] + 'Z',
      })
        .then((res) => {
          if (res.result) {
            setCountStars(res.result.counts)
          }
          setIsLoadingStars(false)
        })
        .catch((e) => {
          setIsLoadingStars(false)
        })
    }
  }
  console.log(countStars)
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={4}>
          <TableContainer component={Paper} style={{ height: '100%' }}>
            <Table aria-label="simple table" style={{ padding: 10 }}>
              <TableBody>
                <TableRow>
                  <TableCell align="left" width={150}>
                    {t('date')}
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
                </TableRow>
                <TableRow>
                  <TableCell align="left" width={150}>
                    {t('originationNumber')}
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={2}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',

                      alignItems: 'end',
                    }}
                  >
                    <div>
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
                              checked={formik.values.originationNumberFilterType === FilterTypeCDR.or}
                              control={<Radio size="small" color="primary" />}
                              onChange={() => handleOnChangeFilterType('originationNumberFilterType', FilterTypeCDR.or)}
                              label={t('or')}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="start"
                              checked={formik.values.originationNumberFilterType === FilterTypeCDR.and}
                              onChange={() =>
                                handleOnChangeFilterType('originationNumberFilterType', FilterTypeCDR.and)
                              }
                              control={<Radio size="small" color="primary" />}
                              label={t('and')}
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        }
                        label={`${t('type')}:`}
                        labelPlacement="start"
                      />
                    </div>
                    <FormControlLabel
                      control={
                        <RadioGroup row aria-label="position" name="position" style={{ marginLeft: 10 }}>
                          <FormControlLabel
                            value="start"
                            checked={formik.values.originationNumberType === FilterTextTypeCDR.EXACT}
                            control={<Radio size="small" color="primary" />}
                            onChange={() =>
                              handleOnChangeFilterTextType('originationNumberType', FilterTextTypeCDR.EXACT)
                            }
                            label={t('exact')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.originationNumberType === FilterTextTypeCDR.BEGINS_WITH}
                            onChange={() =>
                              handleOnChangeFilterTextType('originationNumberType ', FilterTextTypeCDR.BEGINS_WITH)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('beginsWith')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.originationNumberType === FilterTextTypeCDR.CONTAINS}
                            onChange={() =>
                              handleOnChangeFilterTextType('originationNumberType ', FilterTextTypeCDR.CONTAINS)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('contains')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.originationNumberType === FilterTextTypeCDR.ENDS_WITH}
                            onChange={() =>
                              handleOnChangeFilterTextType('originationNumberType ', FilterTextTypeCDR.ENDS_WITH)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('endsWith')}
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      }
                      label={`${t('textType')}:`}
                      labelPlacement="start"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left" width={150}>
                    {t('destinationNumber')}
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={2}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',

                      alignItems: 'end',
                    }}
                  >
                    <div>
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
                              checked={formik.values.destinationNumberFilterType === FilterTypeCDR.or}
                              control={<Radio size="small" color="primary" />}
                              onChange={() => handleOnChangeFilterType('destinationNumberFilterType', FilterTypeCDR.or)}
                              label={t('or')}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="start"
                              checked={formik.values.destinationNumberFilterType === FilterTypeCDR.and}
                              onChange={() =>
                                handleOnChangeFilterType('destinationNumberFilterType', FilterTypeCDR.and)
                              }
                              control={<Radio size="small" color="primary" />}
                              label={t('and')}
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        }
                        label="type:"
                        labelPlacement="start"
                      />
                    </div>

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
                            checked={formik.values.destinationNumberType === FilterTextTypeCDR.EXACT}
                            onChange={() =>
                              handleOnChangeFilterTextType('destinationNumberType', FilterTextTypeCDR.EXACT)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('exact')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.destinationNumberType === FilterTextTypeCDR.BEGINS_WITH}
                            onChange={() =>
                              handleOnChangeFilterTextType('destinationNumberType', FilterTextTypeCDR.BEGINS_WITH)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('beginsWith')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.destinationNumberType === FilterTextTypeCDR.CONTAINS}
                            onChange={() =>
                              handleOnChangeFilterTextType('destinationNumberType', FilterTextTypeCDR.CONTAINS)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('contains')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.destinationNumberType === FilterTextTypeCDR.ENDS_WITH}
                            onChange={() =>
                              handleOnChangeFilterTextType('destinationNumberType', FilterTextTypeCDR.ENDS_WITH)
                            }
                            control={<Radio size="small" color="primary" />}
                            label={t('endsWith')}
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      }
                      label={t('textType')}
                      labelPlacement="start"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" width={150}>
                    {t('callID')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',

                      alignItems: 'end',
                    }}
                  >
                    <div>
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
                              checked={formik.values.callIDFilterType === FilterTypeCDR.or}
                              control={<Radio size="small" color="primary" />}
                              onChange={() => handleOnChangeFilterType('callIDFilterType', FilterTypeCDR.or)}
                              label={t('or')}
                              labelPlacement="end"
                            />
                            <FormControlLabel
                              value="start"
                              checked={formik.values.callIDFilterType === FilterTypeCDR.and}
                              onChange={() => handleOnChangeFilterType('callIDFilterType', FilterTypeCDR.and)}
                              control={<Radio size="small" color="primary" />}
                              label={t('and')}
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        }
                        label={t('type')}
                        labelPlacement="start"
                      />
                    </div>

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
                            checked={formik.values.callIDType === FilterTextTypeCDR.EXACT}
                            onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextTypeCDR.EXACT)}
                            control={<Radio size="small" color="primary" />}
                            label={t('exact')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.callIDType === FilterTextTypeCDR.BEGINS_WITH}
                            onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextTypeCDR.BEGINS_WITH)}
                            control={<Radio size="small" color="primary" />}
                            label={t('beginsWith')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.callIDType === FilterTextTypeCDR.CONTAINS}
                            onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextTypeCDR.CONTAINS)}
                            control={<Radio size="small" color="primary" />}
                            label={t('contains')}
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="start"
                            checked={formik.values.callIDType === FilterTextTypeCDR.ENDS_WITH}
                            onChange={() => handleOnChangeFilterTextType('callIDType', FilterTextTypeCDR.ENDS_WITH)}
                            control={<Radio size="small" color="primary" />}
                            label={t('endsWith')}
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      }
                      label={t('textType')}
                      labelPlacement="start"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="left" width={150}>
                    {t('options')}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
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
                        label={`${t('callType')}:`}
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
                        label={`${t('endpointState')}:`}
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
                        label={`${t('callState')}:`}
                        style={{ marginBottom: 5 }}
                        labelPlacement="start"
                      />

                      <FormControlLabel
                        control={
                          <FormControl
                            variant="outlined"
                            size="small"
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
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
                        label={`${t('result')}:`}
                        labelPlacement="start"
                      />
                    </div>
                    <Button
                      size="medium"
                      style={{ height: 40, marginBottom: 10, marginRight: 10 }}
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
        </Grid>
        <Grid item lg={4} md={4}>
          <Card>
            <HorizontalBar
              data={dataHorBar}
              options={{
                scales: {
                  xAxes: [
                    {
                      display: false,
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </Grid>

        <Grid item lg={12}>
          <MaterialTable
            title={t('callLogs')}
            isLoading={isLoading}
            localization={{ body: { emptyDataSourceMessage: '' } }}
            columns={[
              { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
              { title: t('callID'), field: 'id' },
              {
                title: t('originationNumber'),
                field: '',
                render: (rowData) => (rowData && rowData.originationNumber) || '-',
                width: 150,
                align: 'center',
              },
              {
                title: t('destinationNumber'),
                field: '',
                render: (rowData) => (rowData && rowData.destinationNumber) || '-',
                width: 150,
                align: 'center',
              },
              { title: t('callType'), field: 'type', width: 150 },
              { title: t('callState'), field: 'callState', width: 150 },
              { title: t('duration'), field: '', render: (rowData) => rowData && rowData.connectedAt && 0 },
              { title: t('accountId'), field: 'accountID' },
              { title: t('connectedAt'), field: 'connectedAt' },
              {
                title: t('detailInfo'),
                field: '',

                render: (rowData) =>
                  rowData && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!rowData.accountID}
                      onClick={() => window.open('/user-manager/' + rowData.accountID, '_blank')}
                    >
                      {t('detail')}
                    </Button>
                  ),
              },
            ]}
            data={callData.items}
            options={{
              sorting: false,
              pageSize: formik.values.limit,
              exportButton: true,
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
                            <TableCell> participantState</TableCell>
                            <TableCell> direction</TableCell>
                            <TableCell> lastActiveces</TableCell>
                            <TableCell> audio</TableCell>
                            <TableCell> video</TableCell>
                            <TableCell> screen</TableCell>
                            <TableCell> role</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {d.participantState && d.participantState.map((text) => <p>{text}</p>)}
                            </TableCell>
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
        </Grid>
      </Grid>
      <DatePicker
        ranges={dateRange}
        open={openDateRange}
        onClose={() => setOpenDateRange(false)}
        onChange={(e) => setDateRange(e.selection)}
      />
    </MuiThemeProvider>
  )
}

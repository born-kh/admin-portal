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
  colors,
} from '@material-ui/core'
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
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import SearchIcon from '@material-ui/icons/Search'
import useTranslation from 'hooks/useTranslation'
import { IUserLog } from '@interfaces/user-manager'
import { userAPI, statisticsAPI } from 'service/api'
import MaterialTable from 'material-table'
import { useStylesUserManager } from 'styles/user-manager-styles'
import { Call, CallType, EndpointState } from '@interfaces/statistics'

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
  const [calls, setCalls] = useState<Call[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const { t, locale } = useTranslation()

  moment.locale(locale)
  useEffect(() => {
    setIsLoading(true)
    statisticsAPI
      .callGetAll()
      .then((response) => {
        if (response.status === 200) {
          setCalls(response.data.calls)
        }
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
      })
  }, [])

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
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Date
                </TableCell>

                <TableCell align="left">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                      control={<Checkbox size="small" name="checkedB" color="primary" />}
                      label="From:"
                      labelPlacement="end"
                    />
                    <TextField
                      id="datetime-local"
                      type="date"
                      style={{ width: 120 }}
                      defaultValue="2020-12-24"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                      control={<Checkbox size="small" name="checkedB" color="primary" />}
                      label="Time:"
                      labelPlacement="end"
                    />

                    <TextField
                      id="time"
                      type="time"
                      style={{ width: 80 }}
                      defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </TableCell>

                <TableCell align="left">
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                      control={<Checkbox size="small" name="checkedB" color="primary" />}
                      label="To:"
                      labelPlacement="end"
                    />
                    <TextField
                      id="datetime-local"
                      type="date"
                      style={{ width: 120 }}
                      defaultValue="2020-12-24"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                      control={<Checkbox size="small" name="checkedB" color="primary" />}
                      label="Time:"
                      labelPlacement="end"
                    />

                    <TextField
                      id="time"
                      type="time"
                      defaultValue="07:30"
                      style={{ width: 80 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" width={150}>
                  Origination Number
                </TableCell>
                <TableCell align="left">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    style={{ width: 250, margin: 0 }}
                  />
                </TableCell>

                <TableCell align="right">
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                      value="start"
                      checked={true}
                      control={<Radio size="small" color="primary" />}
                      label="Exact"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio size="small" color="primary" />}
                      label="Begins With"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio size="small" color="primary" />}
                      label="Contains"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
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
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    style={{ width: 250, margin: 0 }}
                  />
                </TableCell>

                <TableCell align="right">
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                      value="start"
                      checked={true}
                      control={<Radio size="small" color="primary" />}
                      label="Exact"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio size="small" color="primary" />}
                      label="Begins With"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio size="small" color="primary" />}
                      label="Contains"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
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
                    variant="outlined"
                    margin="normal"
                    required
                    size="small"
                    style={{ width: 250, margin: 0 }}
                  />
                </TableCell>

                <TableCell align="right">
                  <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                      value="start"
                      checked={true}
                      control={<Radio size="small" color="primary" />}
                      label="Exact"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio size="small" color="primary" />}
                      label="Begins With"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={<Radio size="small" color="primary" />}
                      label="Contains"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
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
                      labelId="fields.passport.nationality"
                      style={{ width: 250, margin: 0 }}
                      id="fields.passport.nationality"
                      name="fields.passport.nationality"
                      value="All Calls"
                    >
                      <MenuItem key={'All Calls'} value={'All Calls'}>
                        All Calls
                      </MenuItem>
                      {Object.keys(CallType).map((key: string) => (
                        <MenuItem key={CallType[key]} value={CallType[key]}>
                          {CallType[key]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                            labelId="fields.passport.nationality"
                            style={{ width: 220, margin: '0px 0px 0px 10px' }}
                            id="fields.passport.nationality"
                            name="fields.passport.nationality"
                            value="ANSWERED"
                          >
                            <MenuItem key={'All Calls'} value={'All Calls'}></MenuItem>
                            {Object.keys(EndpointState).map((key: string) => (
                              <MenuItem key={EndpointState[key]} value={EndpointState[key]}>
                                {EndpointState[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      }
                      label=" Show Calls:"
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
                  <Button variant="contained" color="primary" type="submit" startIcon={<SearchIcon />}>
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
            { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1 },
            { title: 'Call ID', field: 'callId' },
            { title: 'Origination Number', field: 'originationNumber' },
            { title: 'Destination Number', field: 'destinationNumber' },
            { title: 'Call Type', field: 'type' },
            { title: 'Call State', field: 'callState' },
            { title: 'Duration', field: 'callState' },
            { title: 'Account ID', field: 'accountID' },
          ]}
          data={calls}
          options={{
            sorting: false,
            pageSize: 15,
          }}
        />
      </div>
    </MuiThemeProvider>
  )
}

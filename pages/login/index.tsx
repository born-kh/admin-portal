import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import { useStyles } from './styles'
import CopyRight from '@components/CopyRight'
import { useFormik } from 'formik'
import ButtonLoader from '@components/common/ButtonLoader'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import * as authAPI from 'service/authAPI'
import { RootState, AppDispatch } from '@store/reducers'
import { AUTH_STATUS, ERROR_CODES } from '@utils/constants'
import { getErrorMsgFromCode } from '@utils/helpers'
import * as Yup from 'yup'
import { login } from '@store/auth/actions'
export default function SignIn() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const [errorCode, setErrorCode] = useState('')

  const formik = useFormik({
    initialValues: {
      app_uuid: '3dedf9e6-d08b-7cf6-c6e0-4b33e10d4197',
      domain: 'mgr.nexustls.com',
      force_session: false,
      password: '',
      project_uuid: null,
      user_headers: {},
      user_ip: '1.2.3.4',
      username: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    }),
    onSubmit: (values) => {
      setLoading(true)
      setErrorCode('')
      dispatch(login(values))
        .then((response) => {
          setLoading(false)
        })
        .catch((error: any) => {
          if (error.response && error.response.status === 401) {
            setErrorCode(ERROR_CODES.password.wrong)
          } else {
            setErrorCode(ERROR_CODES.unknown)
          }

          setLoading(false)
        })
    },
  })
  const states = useSelector((state: RootState) => {
    return {
      settings: state.settings,
      authStatus: state.authStatus,
    }
  })

  useEffect(() => {
    if (states.authStatus === AUTH_STATUS.loggedOn) {
      router.push('/')
    }
  }, [states.authStatus])

  const errorMessage = getErrorMsgFromCode(errorCode)
  const passwordError = formik.errors.password !== undefined && formik.touched.password
  const usernameError = formik.errors.username !== undefined && formik.touched.username

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Login Page </title>
      </Head>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="UserName"
            name="username"
            autoComplete="username"
            autoFocus
            error={usernameError}
            onChange={formik.handleChange}
            value={formik.values.username}
            helperText={usernameError ? formik.errors.username : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            onChange={formik.handleChange}
            value={formik.values.password}
            helperText={passwordError ? formik.errors.password : null}
          />

          <ButtonLoader
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </ButtonLoader>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </form>
      </div>
      <Box mt={4}>
        <CopyRight />
      </Box>
    </Container>
  )
}

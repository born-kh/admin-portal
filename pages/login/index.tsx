import React, { useState, useEffect } from 'react'
//material ui components
import { Avatar, CssBaseline, TextField, Box, Typography, Container } from '@material-ui/core'
//material ui icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Alert from '@material-ui/lab/Alert'
//custom components
import CopyRight from '@components/CopyRight'
import ButtonLoader from '@components/common/ButtonLoader'
//useFormik hook
import { useFormik } from 'formik'
//Yup lib for validation
import * as Yup from 'yup'
//next header
import Head from 'next/head'
//next router
import { useRouter } from 'next/router'
//constants
import { AUTH_STATUS, ERROR_CODES } from '@utils/constants'
//helpers functions
import { getErrorMsgFromCode } from '@utils/helpers'
//login actions
import { login } from '@store/auth/actions'
//login redusers
import { RootState, AppDispatch } from '@store/reducers'
//react-redux hooks
import { useDispatch, useSelector } from 'react-redux'
//styles
import { useStyles } from './styles'
import useTranslation from 'hooks/useTranslation'
import Title from '@components/common/Title'

/* Login Component */
export default function () {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const [errorCode, setErrorCode] = useState('')
  const { t } = useTranslation()

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
      authStatus: state.auth.authStatus,
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
          {t('admin')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={t('username')}
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
            label={t('password')}
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
            {t('login')}
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

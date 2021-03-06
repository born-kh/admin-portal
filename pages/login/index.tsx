import React, { useState, useEffect } from 'react'
//material ui components
import {
  Avatar,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
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
import { AUTH_STATUS, ERROR_CODES, USER_PERMISSION, permissions } from '@utils/constants'
//helpers functions
import { getErrorMsgFromCode } from '@utils/helpers'
//login actions
import { login } from '@store/auth/actions'
//login redusers
import { RootState, AppDispatch } from '@store/reducers'
//react-redux hooks
import { useDispatch, useSelector } from 'react-redux'
//styles

import useTranslation from 'hooks/useTranslation'
import Title from '@components/common/Title'
import { useStylesLogin } from 'styles/login-styles'
import { UserNameType } from '@Interfaces/Utils'
import jsCookie from 'js-cookie'
import { LocalConsts } from '@Definitions'
import { ServiceAuth, ServiceUserManager } from '@Services'
/* Login Component */
export default function Login() {
  const classes = useStylesLogin()
  const [loading, setLoading] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const [errorCode, setErrorCode] = useState('')
  const { t } = useTranslation()
  const [errorText, setErrorText] = useState<string | null>(null)
  const [usernameType, setUsernameType] = useState<UserNameType>(UserNameType.USERNAME)
  const formik = useFormik({
    initialValues: {
      password: '',

      username: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    }),
    onSubmit: (values) => {
      handleSignIn()
      // setLoading(true)
      // setErrorCode('')
      // dispatch(login(values))
      //   .then((response) => {
      //     setLoading(false)
      //   })
      //   .catch((error: any) => {
      //     if (error.response && error.response.status === 401) {
      //       setErrorCode(ERROR_CODES.password.wrong)
      //     } else {
      //       setErrorCode(ERROR_CODES.unknown)
      //     }
      //     setLoading(false)
      //   })
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

  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    if (jsCookie.get(LocalConsts.LocalStorage.token) && jsCookie.get(LocalConsts.LocalStorage.refreshToken)) {
      console.log(111)
      router
        .push('/')
        .then(() => {
          setIsChecking(true)
        })
        .catch(() => {
          setIsChecking(true)
        })
    } else {
      setTimeout(() => {
        setIsChecking(true)
      }, 500)
    }
  }, [])

  const handleSignIn = () => {
    setErrorText(null)
    setLoading(true)
    ServiceAuth.signIn({
      ...formik.values,
      usernameType,
    })
      .then((responseSignIn) => {
        if (responseSignIn.result) {
          setErrorText(null)
          jsCookie.set(LocalConsts.LocalStorage.token, responseSignIn.result.token)
          jsCookie.set(LocalConsts.LocalStorage.refreshToken, responseSignIn.result.refreshToken)
          ServiceUserManager.getUserPermissions({})
            .then((responsePermissions) => {
              if (responsePermissions.result) {
                localStorage.setItem(
                  LocalConsts.LocalStorage.userPermissions,
                  JSON.stringify(responsePermissions.result.permissions)
                )
                router.push('/')
              } else {
                jsCookie.remove(LocalConsts.LocalStorage.token)
                jsCookie.remove(LocalConsts.LocalStorage.refreshToken)
                setErrorText('Get user permissions ' + responsePermissions.error.reason)
              }
              setLoading(false)
            })
            .catch((e) => {
              jsCookie.remove(LocalConsts.LocalStorage.token)
              jsCookie.remove(LocalConsts.LocalStorage.refreshToken)
              setLoading(false)
            })
        } else {
          setLoading(false)
          setErrorText(responseSignIn.error.reason)
        }
      })
      .catch((e) => {
        setErrorText('')
        setLoading(false)
      })
  }

  const errorMessage = getErrorMsgFromCode(errorCode)
  const passwordError = formik.errors.password !== undefined && formik.touched.password
  const usernameError = formik.errors.username !== undefined && formik.touched.username
  if (!isChecking) {
    return <></>
  }
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
          <FormControl margin="normal" variant="outlined" fullWidth>
            <Select
              labelId="userNametype"
              id="userNametype"
              name="userNametype"
              value={usernameType}
              onChange={(e) => {
                setUsernameType(e.target.value as UserNameType)
              }}
            >
              <MenuItem value={UserNameType.USERNAME} key={UserNameType.USERNAME}>
                {t('loginWithLogin')}
              </MenuItem>
              <MenuItem value={UserNameType.EMAIL} key={UserNameType.EMAIL}>
                {t('loginWithEmail')}
              </MenuItem>
              <MenuItem value={UserNameType.PHONE} key={UserNameType.PHONE}>
                {t('loginWithPhoneNumber')}
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={
              usernameType === UserNameType.USERNAME
                ? t('username')
                : usernameType === UserNameType.PHONE
                ? t('phoneNumber')
                : t('email')
            }
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

          {errorText && <Alert severity="error">{errorText}</Alert>}
        </form>
      </div>
      <Box mt={4}>
        <CopyRight />
      </Box>
    </Container>
  )
}

import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 20,
      width: 550,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
      width: 250,
    },
    button: {
      marginLeft: 400,
    },
    buttonDocument: {
      marginRight: theme.spacing(1),
    },
    buttonTable: {
      margin: theme.spacing(1),
    },
  })
)

import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: 20,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
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

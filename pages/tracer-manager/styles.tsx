import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '16px 40px',
      marginBottom: 20,
      width: 600,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    button: {
      marginLeft: 400,
    },
    buttonTable: {
      margin: theme.spacing(1),
    },
  })
)

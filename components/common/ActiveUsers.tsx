import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography, makeStyles, colors } from '@material-ui/core'
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined'
import { statisticsData } from '@utils/statistics-data'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}))

const ActiveUsers = ({ className, ...rest }: any) => {
  const classes = useStyles()

  const activeUsers = statisticsData.filter(
    (item) => moment(Number(item['Last Active'])).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
  )

  // const value: number = (activeUsers.length / statisticsData.length) * 100

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Active users today
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {activeUsers.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={activeUsers.length} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ActiveUsers

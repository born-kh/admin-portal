import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, makeStyles, colors } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { statisticsData } from '@utils/statistics-data'
import moment from 'moment'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
  root: {},
}))

const Sales = ({ className, ...rest }: any) => {
  const classes = useStyles()
  const theme = useTheme()

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [] as number[],
        label: 'This year',
      },
    ],
    labels: [] as string[],
  }

  const statistics = statisticsData.map((item) => {
    const createdAt = moment(item['Created At']).format('YYYY-MM-DD')
    return { ...item, createdAt }
  })
  console.log(statistics)

  _.values(_.groupBy(statistics, 'createdAt')).map((d) => {
    data.datasets[0].data.push(d.length)
    data.labels.push(d[0].createdAt)
  })

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
            Last 7 days
          </Button>
        }
        title="Registered users by date"
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
          Overview
        </Button>
      </Box>
    </Card>
  )
}

export default Sales

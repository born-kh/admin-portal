import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from '@material-ui/core'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import TabletIcon from '@material-ui/icons/Tablet'
import TabletMacIcon from '@material-ui/icons/TabletMac'
import LaptopWindowsIcon from '@material-ui/icons/LaptopWindows'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import StarIcon from '@material-ui/icons/Star'
import _ from 'lodash'
import { statisticsData } from '@utils/statistics-data'
const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}))

export const StarsCall = ({ className, ...rest }: any) => {
  const classes = useStyles()
  const theme = useTheme()

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
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
  let s = 0
  const data = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [] as string[],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: [] as number[],
  }

  let stars = 0
  let deviceGroups = _.values(_.groupBy(statisticsData, 'Platform')).map((d) => {
    stars++

    let icon = PhoneIphoneIcon
    let color: string = colors.indigo[500]
    if (d[0].Platform === 'android') {
      icon = PhoneAndroidIcon
      color = colors.grey[600]
    } else if (d[0].Platform === 'macOS') {
      icon = LaptopMacIcon
      color = colors.indigo[500]
    } else if (d[0].Platform === 'windows') {
      icon = LaptopWindowsIcon
      color = colors.orange[600]
    } else if (d[0].Platform === 'ios') {
      icon = PhoneIphoneIcon
      color = colors.red[600]
    } else {
      icon = LaptopWindowsIcon
      color = colors.lightGreen[600]
    }
    const value: number = (d.length / statisticsData.length) * 100

    data.datasets[0].data.push(value)
    data.datasets[0].backgroundColor.push(color)
    data.labels.push(stars)
    return {
      title: stars,
      icon,
      color,
      value: value.toFixed(1),
    }
  })

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Call Stars" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {deviceGroups.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              {/* <Icon color="action" /> */}
              <StarIcons star={title} color={color} />
              {/* <Typography color="textPrimary" variant="body1">
                {title}
              </Typography> */}
              <Typography style={{ color }} variant="h5">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

StarsCall.propTypes = {
  className: PropTypes.string,
}
export default StarsCall

const StarIcons = (props: { star: number; color: any }) => {
  let StarIcons: any
  let { color } = props
  switch (props.star) {
    case 1:
      return (
        <div>
          <StarIcon style={{ color }} />
        </div>
      )
    case 2:
      return (
        <div>
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
        </div>
      )
    case 3:
      return (
        <div>
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
        </div>
      )
    case 4:
      return (
        <div>
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
        </div>
      )
    case 5:
      return (
        <div>
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
          <StarIcon style={{ color }} />
        </div>
      )
    default:
      return null
  }
}

import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListSubheader,
} from '@material-ui/core'

import NavItem, { NavItemType } from './NavItem'
import { getNavbarItems } from '@utils/helpers'

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}))

type PropsType = {
  onMobileClose: () => void
  openMobile: boolean
}
interface NavItemsType {
  items: NavItemType[]
  title: string
}

const NavBar = ({ onMobileClose = () => {}, openMobile = false }: PropsType) => {
  const classes = useStyles()
  const [navItems, setNavItems] = useState<NavItemsType[]>(() => {
    return getNavbarItems() as NavItemsType[]
  })

  // const location = useLocation()

  // useEffect(() => {
  //   if (openMobile && onMobileClose) {
  //     onMobileClose()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.pathname])

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Divider />
      <Box p={2}>
        {navItems.map((item: NavItemsType) => (
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {item.title}
              </ListSubheader>
            }
          >
            {item.items.map((item: NavItemType) => (
              <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
            ))}
          </List>
        ))}
      </Box>
    </Box>
  )

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

export default NavBar

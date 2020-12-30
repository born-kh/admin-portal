import React, { ReactNode, SVGAttributes } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Button, ListItem, makeStyles, Theme, createStyles, SvgIconProps } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'hooks/useTranslation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: theme.spacing(1),
      '&.Mui-selected': {
        backgroundColor: 'red',
      },
    },
    button: {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      justifyContent: 'flex-start',
      letterSpacing: 0,
      padding: '10px 8px',
      textTransform: 'none',
      width: '100%',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    title: {
      marginRight: 'auto',
    },
    active: {
      color: theme.palette.primary.main,
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium,
      },
      '& $icon': {
        color: theme.palette.primary.main,
      },
    },
  })
)

interface IconType extends SVGAttributes<SVGElement> {
  color?: string
  size?: number
}

export interface NavItemType {
  href: string
  icon: (props: IconType) => JSX.Element
  title: string
}

interface PropsType extends NavItemType {
  className?: string
}

const NavItem = ({ className, href, icon: Icon, title, ...rest }: PropsType) => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Link href={href} passHref>
      <ListItem className={clsx(classes.item, className)} disableGutters {...rest}>
        <Button
          className={classes.button}
          classes={router.pathname.includes(href) ? { root: classes.active } : { root: undefined }}
        >
          {Icon && <Icon className={classes.icon} size={20} />}
          <span className={classes.title}>{t(title)}</span>
        </Button>
      </ListItem>
    </Link>
  )
}

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
}

export default NavItem

import { IconButton, Menu, Fade, MenuItem, Tooltip } from '@material-ui/core'

import Flag from 'react-flagkit'
import { useState, useContext } from 'react'
import { LanguageContext } from './LanguageProvider'
import { LangType } from '@utils/constants'
import useTranslation from 'hooks/useTranslation'

export default function DropDownLanguage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const langContext = useContext(LanguageContext)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLangClick = (lng: LangType) => {
    if (langContext) {
      const lang = localStorage.getItem('LANG') as LangType
      if (lng && lang !== lng) {
        localStorage.setItem('LANG', lng)
        langContext.setLocale(lng)
      }
    }

    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title={t('chooseLang')} aria-label="add">
        <IconButton aria-label="delete" onClick={handleClick}>
          <Flag country={langContext && langContext.locale === 'ru' ? 'RU' : 'US'} />
        </IconButton>
      </Tooltip>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleLangClick}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleLangClick(LangType.en)}>
          <Flag country="US" />
          English
        </MenuItem>
        <MenuItem onClick={() => handleLangClick(LangType.ru)}>
          <Flag country="RU" />
          Russian
        </MenuItem>
      </Menu>
    </>
  )
}

import { useContext } from 'react'
import { LanguageContext, defaultLocale } from '@components/common/LanguageProvider'
import LangStrings from '@utils/lang'

export default function useTranslation() {
  const lang = useContext(LanguageContext)
  let locale = defaultLocale
  if (lang) {
    locale = lang.locale
  }

  function t(key: string) {
    if (!LangStrings[locale][key || '']) {
      console.warn(`No string '${key}' for locale '${locale}'`)
    }

    return LangStrings[locale][key] || LangStrings['ru'][key] || ''
  }

  return { t, locale }
}

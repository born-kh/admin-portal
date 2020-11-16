import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from 'react'
import { LangType } from '@utils/constants'

export const defaultLocale: LangType = LangType.en
export const locales: LangType[] = [LangType.en, LangType.ru]
export interface ILanguageProviderProps {
  locale: LangType
  setLocale: Dispatch<SetStateAction<LangType>>
}

export const LanguageContext = createContext<ILanguageProviderProps | null>(null)
type PropsType = {
  children: ReactNode
}
function LanguageProvider({ children }: PropsType) {
  useEffect(() => {
    const lang = localStorage.getItem('LANG') as LangType
    setLocale(lang || LangType.en)
  }, [])
  const [locale, setLocale] = useState<LangType>(LangType.en)
  const value: ILanguageProviderProps = { locale, setLocale }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider

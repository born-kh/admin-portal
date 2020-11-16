import { ERROR_CODES, DateConvertType } from './constants'

export function getErrorMsgFromCode(code: string | number | null) {
  switch (code) {
    case '':
      return null
    case ERROR_CODES.password.wrong:
      return 'Wrong credentials.'
    case ERROR_CODES.unknown:
      return 'Unknown error please try later.'
    default:
      return 'Unknown error please try later.'
  }
}

export const removeDuplicatesFromArrayByProperty = (arr: any[], prop: string) =>
  arr.reduce((accumulator, currentValue) => {
    if (!accumulator.find((obj: any) => obj[prop] === currentValue[prop])) {
      accumulator.push(currentValue)
    }
    return accumulator
  }, [])

export function dateFormatter(
  date: Date,
  locale = 'en-US',
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }
) {
  if (date) {
    let new_date = new Intl.DateTimeFormat(locale, options)
    return new_date.format(new Date(date))
  }
  return null
}
export function convertMRZDate(str: string, dateConvertType: DateConvertType) {
  try {
    if (str && str.length >= 6) {
      console.log(str)
      var year = parseInt(str.substring(0, 2))
      var month = str.substring(2, 4)
      var day = str.substring(4, 6)

      switch (dateConvertType) {
        case DateConvertType.dob:
          let curYear = new Date().getFullYear()
          if (year + 2000 < curYear) {
            year += 2000
          } else {
            year += 1900
          }
          break
        case DateConvertType.expiry:
          year += 2000
          break
        case DateConvertType.issue:
          year += 2000 - 10
          break
        default:
      }
      console.log(year, month, day)
      const date = new Date(year.toString(), month - 1, day).toISOString().split('.')[0] + 'Z'

      return date.substring(0, 10)
    }
    return new Date().toISOString().split('.')[0] + 'Z'
  } catch (e) {
    console.log(e)
  }
}

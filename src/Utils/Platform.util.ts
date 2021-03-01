export const PlatformUtil = {
  deviceName: () => {
    return navigator.userAgent
  },

  language: () => {
    return navigator.language.substring(0, 2)
  },
}

import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title || 'SMS 管理系统'

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}

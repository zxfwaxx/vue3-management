const SYSTEM_NAME = "v3-admin-vite"

/** 缓存数据时用到的 Key */
class CacheKey {
  static TOKEN = `${SYSTEM_NAME}-token-z`
  static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-z`
  static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-z`
}

export default CacheKey
